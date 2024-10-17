# The base image for the supersim image can be modified
# by specifying BASE_IMAGE build argument
ARG BASE_IMAGE=golang:1.22

# 
# This stage builds the foundry binaries
# 
FROM $BASE_IMAGE AS foundry

# Make sure foundryup is available
ENV PATH="/root/.foundry/bin:${PATH}"

# Install required system packages
RUN \
    apt-get update && \
    apt-get install -y curl git

# Install foundry
RUN curl -L https://foundry.paradigm.xyz | bash
RUN foundryup

# 
# This stage builds the project
# 
FROM $BASE_IMAGE AS builder

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go build -o supersim cmd/main.go

# 
# This stage exposes the supersim binary
# 
FROM $BASE_IMAGE AS runner

# Add foundry & supersim directories to the system PATH
ENV PATH="/root/.foundry/bin:/root/.supersim/bin:${PATH}"

WORKDIR /app

# Get the supersim binary from the builder
COPY --from=builder /app/supersim /root/.supersim/bin/supersim

# Get the anvil binary
COPY --from=foundry /root/.foundry/bin/anvil /root/.foundry/bin/anvil

# Make sure the foundry binaries exist
RUN anvil --version
RUN supersim --help

CMD ["supersim"]

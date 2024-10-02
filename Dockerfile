FROM golang:1.22

RUN apt-get update && apt-get install -y curl git

WORKDIR /app

RUN curl -L https://foundry.paradigm.xyz | bash

ENV PATH="/root/.foundry/bin:${PATH}"

RUN foundryup

COPY . .

RUN go mod tidy

RUN go build -o supersim cmd/main.go

CMD ["./supersim"]

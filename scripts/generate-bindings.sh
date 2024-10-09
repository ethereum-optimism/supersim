#!/bin/bash

# Function to print usage information
print_usage() {
    echo "Usage: $0 -u <url> -n <name1,name2,name3...> [-o <output_directory>]"
    echo "  -u: URL of the tar.gz file to download"
    echo "  -n: Comma-separated list of contract names"
    echo "  -o: Output directory for generated bindings (optional, default: current directory)"
}

# Parse command line arguments
while getopts "u:n:o:" opt; do
    case $opt in
        u) url="$OPTARG" ;;
        n) names="$OPTARG" ;;
        o) outdir="$OPTARG" ;;
        *) print_usage; exit 1 ;;
    esac
done

# Check if required arguments are provided
if [ -z "$url" ] || [ -z "$names" ]; then
    print_usage
    exit 1
fi

# Set default output directory if not specified
if [ -z "$outdir" ]; then
    outdir="$PWD"
else
    # Convert relative path to absolute path
    outdir="$(cd "$(dirname "$outdir")"; pwd)/$(basename "$outdir")"
    # Create the output directory if it doesn't exist
    mkdir -p "$outdir"
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq to run this script."
    exit 1
fi

# Store the original directory
original_dir="$PWD"

# Create a temporary directory for all our work
temp_dir=$(mktemp -d)
cd "$temp_dir"

# 1. Download the tar.gz file
echo "Downloading from $url"
curl -L "$url" -o artifacts.tar.gz

# 2. Unzip the file
echo "Extracting artifacts"
tar -xzf artifacts.tar.gz

# Create a directory for ABIs
mkdir -p abis

# 3. Extract ABIs and generate bindings for each contract
IFS=',' read -ra name_array <<< "$names"
for name in "${name_array[@]}"; do
    echo "Processing $name"
    
    # Find the JSON file for this contract in the specific directory structure
    json_file=$(find . -path "./forge-artifacts/${name}.sol/${name}.json" -print -quit)
    
    if [ -z "$json_file" ]; then
        echo "Warning: JSON file for $name not found. Skipping."
        continue
    fi
    
    # Extract the ABI using jq
    echo "Extracting ABI for $name"
    jq '.abi' "$json_file" > "abis/${name}.abi"
    
    # Generate bindings
    echo "Generating bindings for $name"
    abigen --abi "abis/${name}.abi" --pkg bindings --type "$name" --out "${name}.go"
    
    # Move the generated file to the specified output directory
    mv "${name}.go" "$outdir/"
done

# Clean up
cd "$original_dir"
rm -rf "$temp_dir"

echo "Binding generation complete. Output files are in $outdir"
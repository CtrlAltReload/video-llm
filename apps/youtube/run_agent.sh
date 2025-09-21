#!/bin/bash

# Check if main.py is provided as an argument
if [ "$1" != "main.py" ]; then
    echo "Usage: $0 main.py"
    exit 1
fi

# Ensure uv is installed
if ! command -v uv &> /dev/null; then
    echo "uv is not installed. Please install it using 'pip install uv'."
    exit 1
fi

# Activate virtual environment and run the agent
uv run python "$1"
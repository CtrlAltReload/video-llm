# YouTube Course Agent

Converts long-form YouTube coding tutorials (≥1hr) into interactive JSON courses using CrewAI and Coral Protocol.

## Setup

1. Create virtual env: `uv venv .venv && source .venv/bin/activate` (Linux/Mac) or `.venv\Scripts\Activate.ps1` (Windows).
2. Install deps: `uv sync`.
3. Copy `.env.example` to `.env` and configure (e.g., API keys).
4. Ensure Coral Server running (update `coral-server/src/main/resources/application.yaml` with MODEL\_\* vars).
5. Start Coral Studio for monitoring.

## Execution

- **Dev Mode**: `uv run main.py --video-url https://youtube.com/watch?v=example`
- **Executable Mode** (in Coral Server config):
  - Linux/Mac: `command: ["bash", "-c", "${PROJECT_DIR}/run_agent.sh main.py"]`
  - Windows: `command: ["powershell", "-ExecutionPolicy", "Bypass", "-File", "${PROJECT_DIR}/run_agent.ps1", "main.py"]`
  - Set env vars in config.

## Features

- Pre-checks: Duration validation, auto-categorization.
- Pipeline: Breakdown → Course (standard/project) → Review.
- Coral: Logs to Server/Studio; collaborates via MCP.

## Troubleshooting

- No transcript? Integrate YouTube Transcript API in main.py.
- Coral errors? Check SSE URL and Server logs.

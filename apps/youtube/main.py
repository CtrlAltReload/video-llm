import urllib.parse
from dotenv import load_dotenv
import os, json, asyncio, traceback
from langchain.chat_models import init_chat_model
from langchain.prompts import ChatPromptTemplate
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.tools import tool
import yt_dlp

load_dotenv()

@tool
def analyse_youtube_video(video_url: str) -> str:
    """Fetch details for a given YouTube URL and return a short analysis."""
    try:
        ydl_opts = {
            "quiet": True,
            "skip_download": True,
            "dump_single_json": True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
        title = info.get("title", "Unknown title")
        uploader = info.get("uploader", "Unknown uploader")
        duration = info.get("duration_string") or f"{info.get('duration', 0)} seconds"
        view_count = info.get("view_count", 0)
        description = (info.get("description") or "").strip().split("\n")[0][:200]
        return (f"Title: {title}\n"
                f"Uploader: {uploader}\n"
                f"Duration: {duration}\n"
                f"Views: {view_count}\n"
                f"Description snippet: {description}")
    except Exception as e:
        return f"Error analysing video: {str(e)}"

def get_tools_description(tools):
    return "\n".join(
        f"Tool: {tool.name}, Schema: {json.dumps(tool.args).replace('{', '{{').replace('}', '}}')}"
        for tool in tools
    )

async def create_agent(coral_tools, agent_tools):
    coral_tools_description = get_tools_description(coral_tools)
    agent_tools_description = get_tools_description(agent_tools)
    combined_tools = coral_tools + agent_tools
    
    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            f"""You are a YouTube Analysis Agent interacting with tools from Coral Server and your own tools to analyse YouTube videos. 
            Your task is to respond to mentions from other agents by fetching information about a given YouTube URL and returning analysis results.
            
            Follow these steps in order:
            1. Call wait_for_mentions from coral tools (timeoutMs: 30000) to receive mentions from other agents.
            2. When you receive a mention, keep the thread ID and the sender ID.
            3. Take 2 seconds to think about the content of the message and extract the YouTube URL.
            4. Use the analyse_youtube_video tool to fetch video information.
            5. Take 3 seconds and compose a short analysis or summary. Make this your response as "answer".
            6. Use send_message from coral tools to send the "answer" in the same thread ID to the sender ID.
            7. If any error occurs, use send_message to send an error description in the same thread ID to the sender ID.
            8. Always respond back to the sender agent even if you have no answer or error.
            9. Wait for 2 seconds and repeat the process from step 1.

            These are the list of coral tools: {coral_tools_description}
            These are the list of your tools: {agent_tools_description}"""
        ),
        ("placeholder", "{agent_scratchpad}")
    ])

    model = init_chat_model(
        model=os.getenv("MODEL_NAME", "gpt-4o"),
        model_provider=os.getenv("MODEL_PROVIDER", "openai"),
        api_key=os.getenv("MODEL_API_KEY"),
        temperature=os.getenv("MODEL_TEMPERATURE", "0.3"),
        max_tokens=os.getenv("MODEL_MAX_TOKENS", "8000"),
        base_url=os.getenv("MODEL_BASE_URL", None)
    )
    
    agent = create_tool_calling_agent(model, combined_tools, prompt)
    return AgentExecutor(agent=agent, tools=combined_tools, verbose=True, handle_parsing_errors=True)

async def main():
    runtime = os.getenv("CORAL_ORCHESTRATION_RUNTIME", None)
    if runtime is None:
        load_dotenv()

    base_url = os.getenv("CORAL_SSE_URL")
    if not base_url:
        raise RuntimeError("CORAL_SSE_URL not set in environment")

    agentID = os.getenv("CORAL_AGENT_ID", "youtubeAnalysisAgent")
    
    coral_params = {
        "agentId": agentID,
        "agentDescription": "YouTube Analysis Agent summarises or analyses YouTube videos"
    }
    
    query_string = urllib.parse.urlencode(coral_params)
    CORAL_SERVER_URL = f"{base_url}?{query_string}"

    timeout = int(os.getenv("TIMEOUT_MS", 300))
    
    try:
        client = MultiServerMCPClient(
            connections={
                "coral": {
                    "transport": "sse",
                    "url": CORAL_SERVER_URL,
                    "timeout": timeout,
                    "sse_read_timeout": timeout,
                }
            }
        )
        
        coral_tools = await client.get_tools(server_name="coral")
        agent_tools = [analyse_youtube_video]
        
        agent_executor = await create_agent(coral_tools, agent_tools)

        # Main loop
        while True:
            try:
                await agent_executor.ainvoke({"agent_scratchpad": []})
                await asyncio.sleep(1)
            except KeyboardInterrupt:
                break
            except Exception as e:
                traceback.print_exc()
                await asyncio.sleep(5)

    except Exception as e:
        if 'unhandled errors in a TaskGroup' in str(e) or '404' in str(e):
            print(f"Error: Cannot connect to Coral server at {base_url}")
            print("Please ensure the Coral server is running and the URL is correct.")
        else:
            print(f"Error: {e}")
            traceback.print_exc()
        
        # Fallback test mode
        test_input = input("\nEnter a YouTube URL to test the tool (or press Enter to exit): ").strip()
        if test_input:
            result = analyse_youtube_video(test_input)
            print(f"\nAnalysis Result:\n{result}")

if __name__ == "__main__":
    asyncio.run(main())
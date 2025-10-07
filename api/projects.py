from fastapi import APIRouter
import os
from notion_client import Client
from dotenv import load_dotenv
import json
from pydantic import BaseModel

load_dotenv()
router = APIRouter()

def _get_notion_client():
    NOTION_API_KEY = os.environ.get("NOTION_API_KEY")

    if not NOTION_API_KEY:
        raise ValueError("❌ NOTION_API_KEY 환경변수가 비어 있습니다.")
    
    return Client(auth=os.environ.get("NOTION_API_KEY"))

@router.get("/projects")
def get_notion_pages():
    notion = _get_notion_client()
    NOTION_PROJECTS_ID = os.environ.get("NOTION_PROJECTS_ID")
    if not NOTION_PROJECTS_ID:
        raise ValueError("❌ NOTION_PROJECTS_ID 환경변수가 비어 있습니다.")
    response = notion.databases.query(database_id=NOTION_PROJECTS_ID)
    print(response["results"][0])
    return response["results"]

@router.get("/projects/page")
def get_notion_page(projectId: str):
    if not projectId:
        raise ValueError("❌ Project ID가 제공되지 않았습니다.")
    NOTION_PROJECTS_ID = projectId
    print(NOTION_PROJECTS_ID)
    notion = _get_notion_client()
    response = notion.blocks.children.list(block_id=NOTION_PROJECTS_ID)
    record_map = {
        "block": {
            block["id"]: block for block in response.get("results", [])
        }
    }
    return response

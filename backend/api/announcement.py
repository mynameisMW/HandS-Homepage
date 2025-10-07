from fastapi import APIRouter
import os
from notion_client import Client
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

def _get_notion_client():
    NOTION_API_KEY = os.environ.get("NOTION_API_KEY")
    NOTION_ANNOUNCEMENT_ID = os.environ.get("NOTION_ANNOUNCEMENT_ID")

    if not NOTION_API_KEY:
        raise ValueError("❌ NOTION_API_KEY 환경변수가 비어 있습니다.")
    if not NOTION_ANNOUNCEMENT_ID:
        raise ValueError("❌ NOTION_ANNOUNCEMENT_ID 환경변수가 비어 있습니다.")
    return Client(auth=os.environ.get("NOTION_API_KEY"))

@router.get("/announcements")
def get_notion_pages():
    notion = _get_notion_client()
    response = notion.databases.query(
        **{
            "database_id": os.environ.get("NOTION_ANNOUNCEMENT_ID"),
            "sorts": [
                {"property": "생성일", "direction": "descending"}
            ],
            "page_size": 3,  # 상위 3개만
        }
    )
    return response

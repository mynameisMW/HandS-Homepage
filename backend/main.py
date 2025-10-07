from fastapi import FastAPI
from api import login, verify_router, announcement, projects
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 중엔 전체 허용 (배포 시엔 도메인 제한)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login.router)
app.include_router(verify_router.router)
app.include_router(announcement.router)
app.include_router(projects.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}   

# To run the app, use the command:
# uvicorn main:app --reload --host 0.0.0.0 --port 8000

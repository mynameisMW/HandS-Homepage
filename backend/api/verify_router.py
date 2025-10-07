import jwt
import datetime
import os 
from dotenv import load_dotenv
from fastapi import APIRouter
import sqlite3
from pydantic import BaseModel

conn = sqlite3.connect("login.db", check_same_thread=False)
cursor = conn.cursor()

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

router = APIRouter()

class TokenData(BaseModel):
    token: str

@router.post("/verify")
def verify_token(token_data: TokenData):
    try:
        payload = jwt.decode(token_data.token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("username")
        role = payload.get("role")
        if role == "admin":
            print("Token valid")
            return {"role":"admin", "username": username}
        elif role == "user": 
            print("Not enough permissions")
            return {"role":"user", "username": username}
        else:
            print("Invalid role")
            return {"error":"Invalid role", "username": username}
    except jwt.ExpiredSignatureError:        
        return {"error": "Token expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}

@router.post("/verify/refresh")
def refresh_access_token(token_data: TokenData):
    try:
        payload = jwt.decode(token_data.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            return {"error": "Invalid token type"}
        
        username = payload.get("username")
        # DB에서 사용자 정보를 다시 확인하여 role을 가져옵니다.
        cursor.execute("SELECT id FROM users WHERE username=?", (username,))
        user_row = cursor.fetchone()
        if not user_row:
            return {"error": "User not found"}
        user_id = user_row[0]

        new_access_payload = {
            "username": username,
            "role": "admin" if user_id == "admin" else "user",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        new_access_token = jwt.encode(new_access_payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": new_access_token, "token_type": "bearer"}
    except jwt.ExpiredSignatureError:
        return {"error": "Refresh token expired. Please log in again."}
    except jwt.InvalidTokenError:
        return {"error": "Invalid refresh token."}


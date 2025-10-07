import sqlite3
import bcrypt
import jwt
import datetime
from fastapi import APIRouter
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

conn = sqlite3.connect("login.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
    id TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
);
""")
conn.commit()

router = APIRouter()

class LoginRequest(BaseModel):
    id: str
    password: str
    
class CreateUserRequest(BaseModel):
    username: str
    id: str
    password: str
    email: str


@router.post("/user/create")
def _create_user(create_user_request: CreateUserRequest):
    try:
        if create_user_request.id == 'admin':
            return {'error': "ID cannot be 'admin'."}
        cursor = conn.cursor()
        hashed_password = bcrypt.hashpw(create_user_request.password.encode('utf-8'), bcrypt.gensalt())
        cursor.execute("INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)", (create_user_request.id, create_user_request.username, hashed_password, create_user_request.email))
        conn.commit()
        return {"message":"User created.", "username":create_user_request.username, "id":create_user_request.id}
    except sqlite3.IntegrityError:
        return {"error":"id already exists."}

@router.post("/user/read")
def _read_user(id):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id=?", (id,))
    row = cursor.fetchone()
    if row:
        return {"id": row[0], "username": row[1], "hashed_password": row[2], "email": row[3]}
    else:
        return "User not found."

@router.post("/user/read_all")
def _get_all_users():
    cursor = conn.cursor()
    cursor.execute("""
            SELECT id, username, email
            FROM users
            WHERE LOWER(username) <> 'admin'
            ORDER BY id ASC
        """)    
    rows = cursor.fetchall()
    return [{"id": row[0], "username": row[1], "email": row[2]} for row in rows]

@router.post("/user/edit")
def _edit_user(login_request: LoginRequest, new_password: str = None):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id=?", (login_request.id,))
    row = cursor.fetchone()
    if not row:
        return "User not found."
    if not bcrypt.checkpw(login_request.password.encode('utf-8'), row[2]):
        return "Incorrect password."
    elif new_password:
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        cursor.execute("UPDATE users SET password=? WHERE id=?", (hashed_password, login_request.id))
    conn.commit()
    return "User updated."

@router.post("/user/delete")
def _delete_user(id):
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id=?", (id,))
    conn.commit()
    return {"message":"User deleted.", "id":id}

@router.post("/login")
def _login(login_request: LoginRequest):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id=?", (login_request.id,))
    row = cursor.fetchone()
    if not row:
        return {"error":"User not found."}
    if not bcrypt.checkpw(login_request.password.encode('utf-8'), row[2]):
        return {"error":"Incorrect password."}
    if login_request.id =='':
        return {'error':"ID cannot be empty."}
    username = row[1]
    print("row", row[1],username)
    payload = {
        "username": username,
        "role": "admin" if login_request.id == "admin" else "user",
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        "email": row[3]
        }
    refresh_payload = {
        "username": username,
        "type": "refresh",   # Refresh임을 구분
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7),
    }

    print("payload", payload)
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    refresh_token = jwt.encode(refresh_payload, SECRET_KEY, algorithm=ALGORITHM)

    return {"access_token": token, "token_type": "bearer", "refresh_token": refresh_token}

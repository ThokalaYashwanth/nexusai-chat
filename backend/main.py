from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from groq import Groq
import uuid
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Chat Assistant API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client_db = AsyncIOMotorClient(MONGO_URL)
db = client_db["chatdb"]
sessions_col = db["sessions"]
messages_col = db["messages"]

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str

class Message(BaseModel):
    role: str
    content: str
    timestamp: Optional[str] = None

class ChatResponse(BaseModel):
    session_id: str
    reply: str
    timestamp: str

class SessionInfo(BaseModel):
    session_id: str
    created_at: str
    message_count: int
    last_message: Optional[str] = None

@app.get("/")
async def root():
    return {"status": "ok", "message": "AI Chat Assistant API is running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "1.0.0"}

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    session = await sessions_col.find_one({"session_id": session_id})
    if not session:
        await sessions_col.insert_one({"session_id": session_id, "created_at": now})
    history_cursor = messages_col.find({"session_id": session_id}, sort=[("timestamp", 1)], limit=20)
    history = await history_cursor.to_list(length=20)
    await messages_col.insert_one({"session_id": session_id, "role": "user", "content": req.message, "timestamp": now})
    messages_payload = [{"role": "system", "content": "You are a helpful, friendly, and knowledgeable AI assistant. Respond clearly and concisely. Use markdown formatting where appropriate."}]
    for m in history:
        messages_payload.append({"role": m["role"], "content": m["content"]})
    messages_payload.append({"role": "user", "content": req.message})
    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages_payload,
            max_tokens=1024,
        )
        reply = response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)}")
    reply_time = datetime.utcnow().isoformat()
    await messages_col.insert_one({"session_id": session_id, "role": "assistant", "content": reply, "timestamp": reply_time})
    return ChatResponse(session_id=session_id, reply=reply, timestamp=reply_time)

@app.get("/history/{session_id}", response_model=List[Message])
async def get_history(session_id: str):
    cursor = messages_col.find({"session_id": session_id}, sort=[("timestamp", 1)])
    msgs = await cursor.to_list(length=100)
    return [Message(role=m["role"], content=m["content"], timestamp=m.get("timestamp")) for m in msgs]

@app.get("/sessions", response_model=List[SessionInfo])
async def list_sessions():
    cursor = sessions_col.find({}, sort=[("created_at", -1)], limit=20)
    sessions = await cursor.to_list(length=20)
    result = []
    for s in sessions:
        sid = s["session_id"]
        count = await messages_col.count_documents({"session_id": sid})
        last = await messages_col.find_one({"session_id": sid, "role": "user"}, sort=[("timestamp", -1)])
        result.append(SessionInfo(session_id=sid, created_at=s.get("created_at", ""), message_count=count, last_message=last["content"][:60] if last else None))
    return result

@app.delete("/session/{session_id}")
async def delete_session(session_id: str):
    await messages_col.delete_many({"session_id": session_id})
    await sessions_col.delete_one({"session_id": session_id})
    return {"status": "deleted", "session_id": session_id}

@app.delete("/session/{session_id}/messages")
async def clear_messages(session_id: str):
    await messages_col.delete_many({"session_id": session_id})
    return {"status": "cleared", "session_id": session_id}

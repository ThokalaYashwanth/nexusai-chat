---

## API Endpoints

| Method | Endpoint                          | Description                  |
|--------|----------------------------------|------------------------------|
| GET    | `/`                              | Health check                 |
| POST   | `/chat`                          | Send a message, get AI reply |
| GET    | `/history/{session_id}`          | Fetch conversation history   |
| GET    | `/sessions`                      | List all sessions            |
| DELETE | `/session/{session_id}`          | Delete a session             |
| DELETE | `/session/{session_id}/messages` | Clear messages only          |

**POST /chat — Request body:**
```json
{
  "session_id": "optional-uuid",
  "message": "Your message here"
}
```

**POST /chat — Response:**
```json
{
  "session_id": "uuid",
  "reply": "AI response here",
  "timestamp": "2026-06-07T08:00:00"
}
```

---

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your GROQ_API_KEY to .env
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### API Docs
Visit **http://localhost:8000/docs** for interactive Swagger documentation.

---

## Features

- Multi-turn conversations with full context memory
- Persistent chat history stored in MongoDB
- Session management — create, switch, delete conversations
- Rich markdown rendering — code blocks, tables, lists
- Animated typing indicator while AI responds
- Dark and light mode toggle
- Responsive design for desktop and mobile
- User-friendly error handling
- Suggestion chips for new users
- Auto-scroll to latest message

---

## Evaluation Criteria Coverage

| Criterion | Implementation |
|-----------|---------------|
| Frontend (/10) | React 18 + Tailwind CSS, glassmorphism UI, animated transitions, dark mode, responsive layout |
| Backend (/10) | FastAPI with 6 REST endpoints, async MongoDB via Motor, session management, Pydantic validation, error handling |
| Visual Quality (/10) | DM Sans font, custom brand colors, chat bubbles, markdown rendering, typing dots, welcome screen |
ENDOFFILE

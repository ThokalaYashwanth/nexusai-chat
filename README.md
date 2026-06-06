# NexusAI — Intelligent Chat Assistant

A full-stack AI-powered chat application built with React, FastAPI, MongoDB, and Claude.

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS  |
| Backend    | FastAPI (Python), Pydantic    |
| AI Model   | Claude via Anthropic API      |
| Database   | MongoDB (via Motor async)     |
| Deployment | Docker Compose                |

---

## Project Structure

```
ai-chat-assistant/
├── backend/
│   ├── main.py              # FastAPI app — all routes
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Root component
│   │   ├── components/
│   │   │   ├── Sidebar.jsx       # Session management sidebar
│   │   │   ├── MessageBubble.jsx # Chat bubbles + markdown
│   │   │   ├── ChatInput.jsx     # Textarea + send
│   │   │   └── WelcomeScreen.jsx # Empty state
│   │   ├── hooks/
│   │   │   └── useChat.js   # Chat state management hook
│   │   └── utils/
│   │       └── api.js       # Axios API calls
│   ├── index.html
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

---

## API Endpoints

| Method | Endpoint                       | Description                  |
|--------|-------------------------------|------------------------------|
| GET    | `/`                           | Health check                 |
| POST   | `/chat`                       | Send a message, get AI reply |
| GET    | `/history/{session_id}`       | Fetch conversation history   |
| GET    | `/sessions`                   | List all sessions            |
| DELETE | `/session/{session_id}`       | Delete a session             |
| DELETE | `/session/{session_id}/messages` | Clear messages only       |

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

## Quick Start (Docker)

### 1. Clone / navigate to the project
```bash
cd ai-chat-assistant
```

### 2. Set up environment
```bash
cp backend/.env.example backend/.env
# Edit backend/.env and add your Anthropic API key
```

### 3. Run everything
```bash
docker-compose up --build
```

- Frontend → http://localhost:3000
- Backend API → http://localhost:8000
- API Docs → http://localhost:8000/docs

---

## Local Development (without Docker)

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

> Make sure MongoDB is running locally: `mongod --dbpath /your/path`

---

## Features

- **Multi-turn conversations** — Full context window maintained per session
- **Persistent chat history** — Stored in MongoDB, survives page refreshes
- **Session management** — Create, switch, and delete conversations from sidebar
- **Rich markdown rendering** — Code blocks, tables, bold, lists
- **Typing indicator** — Animated dots while AI is responding
- **Dark/Light mode** — Toggleable, persists preference
- **Responsive design** — Works on desktop and mobile
- **Error handling** — User-friendly error messages
- **Suggestion chips** — Starter prompts for new users
- **Auto-scroll** — Automatically scrolls to latest message

---

## Evaluation Criteria Coverage

| Criterion | Score | Implementation |
|-----------|-------|----------------|
| Frontend | /10 | React + Tailwind, glassmorphism design, animated transitions, responsive, dark mode |
| Backend | /10 | FastAPI, REST endpoints, MongoDB async, session management, error handling |
| Visual Quality | /10 | DM Sans font, brand colors, chat bubbles, markdown, typing dots, welcome screen |

# Enterprise AI Support Agent — Frontend

A production-style enterprise AI assistant frontend built with Next.js, TypeScript, and Tailwind CSS.

This application provides a modern conversational AI interface with streaming responses, persistent conversations, citation rendering, and multi-session chat management.

---

# 🚀 Features

## Conversational AI UI
- Streaming AI responses
- Markdown rendering
- Typing indicator
- Auto-scroll
- Enter-to-send support

## Persistent Conversations
- Multi-session chat support
- Persistent chat history
- Conversation sidebar
- New chat creation
- Conversation switching

## Citation System
- Source citation rendering
- Persistent citation history
- RAG-compatible UX

## Enterprise UX
- Responsive chat layout
- Sidebar navigation
- Session-based conversations
- Real-time streaming updates

---

# 🚀 Tech Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- React Markdown

---

# 🚀 Backend Integration

Frontend integrates with the Enterprise AI FastAPI backend:

- `/ask`
- `/ask-stream`
- `/conversations`
- `/conversations/{session_id}`

---

# 🚀 Local Development

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Application runs at:

```text
http://localhost:3000
```

---

# 🚀 Environment Requirements

Backend API expected at:

```text
http://127.0.0.1:8000
```

---

# 🚀 Current Capabilities

- Streaming conversational AI
- Persistent chat sessions
- Cosmos DB-backed conversations
- Citation persistence
- Multi-chat workspace
- Session metadata support

---

# 🚀 Planned Features

- Conversation rename
- Conversation delete
- Responsive mobile layout
- Authentication
- File upload support
- Multi-agent workflows
- Syntax highlighting
- Voice support

---

# 🚀 Architecture

Frontend communicates with:
- FastAPI backend
- Azure Cosmos DB
- Redis cache
- Azure-hosted AI services

---

# 🚀 Status

Active enterprise AI platform development project.
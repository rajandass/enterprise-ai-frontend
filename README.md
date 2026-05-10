# Enterprise AI Support Agent — Frontend

Enterprise-grade AI chat frontend built with Next.js, TypeScript, Tailwind CSS, and Docker.  
This application provides a production-ready conversational AI interface with streaming responses, persistent chat history, citations, and Azure cloud deployment.

---

# 🚀 Features

- Real-time AI streaming responses
- Persistent conversation history
- Conversation sidebar with session management
- Source citations support
- Markdown rendering
- New chat workflow
- Cosmos DB-backed chat persistence
- Dockerized frontend deployment
- Azure App Service deployment
- GitHub Actions CI/CD pipeline
- Approval-based production deployments
- Production-ready architecture

---

# 🏗️ Architecture

## Application Architecture

```text
Next.js Frontend
        ↓
FastAPI Backend API
        ↓
OpenAI APIs
Cosmos DB
Redis Cache
```

---

## Deployment Architecture

```text
GitHub Actions
        ↓
Docker Build
        ↓
Azure Container Registry
        ↓
Azure App Service
```

---

# 🛠️ Tech Stack

## Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- React Markdown

## Infrastructure
- Docker
- Azure App Service
- Azure Container Registry (ACR)
- GitHub Actions

## Backend Integration
- FastAPI
- OpenAI APIs
- Cosmos DB
- Redis

---

# 📁 Project Structure

```text
enterprise-ai-frontend/
│
├── app/
│   ├── page.tsx
│   ├── globals.css
│   └── layout.tsx
│
├── public/
│
├── .github/
│   └── workflows/
│       └── frontend-deploy.yml
│
├── Dockerfile
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_KEY=your-api-key
```

---

# 💻 Local Development

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🐳 Docker Setup

## Build Docker Image

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000 \
  --build-arg NEXT_PUBLIC_API_KEY=your-api-key \
  -t enterprise-ai-frontend .
```

---

## Run Docker Container

```bash
docker run -p 3000:3000 enterprise-ai-frontend
```

---

# ☁️ Azure Deployment

## Production Services

| Service | Purpose |
|---|---|
| Azure App Service | Frontend hosting |
| Azure Container Registry | Docker image storage |
| GitHub Actions | CI/CD automation |

---

## Production Deployment Flow

```text
Feature Branch
      ↓
Pull Request
      ↓
Merge to Main
      ↓
GitHub Actions Pipeline
      ↓
Docker Image Build
      ↓
Push to Azure Container Registry
      ↓
Approval Gate
      ↓
Azure App Service Deployment
```

---

# 🔐 Security

## Security Features

- API key authentication
- Azure Key Vault integration
- Managed Identity support
- Protected production branch
- Approval-based deployments

---

# 🔄 CI/CD Pipeline

Frontend deployment is fully automated using GitHub Actions.

## Pipeline Stages

1. Trigger on `main` branch merge
2. Build Docker image
3. Push image to Azure Container Registry
4. Wait for deployment approval
5. Deploy to Azure App Service

---

# 📡 API Integration

Frontend integrates with the FastAPI backend using:

```text
/ask
/ask-stream
/conversations
/conversations/{session_id}
```

---

# 🧠 AI Features

- Streaming chat responses
- Retrieval-augmented generation (RAG)
- Persistent session memory
- Source citations
- Multi-session chat support

---

# 📈 Production Capabilities

## Current Production Features

- Persistent conversations
- Session metadata management
- Streaming AI responses
- Conversation sidebar
- Dockerized deployment
- Enterprise CI/CD
- Azure cloud hosting

---

# 🚀 Future Roadmap

## Enterprise AI Features

- Document upload
- Hybrid search
- Semantic reranking
- Multi-agent orchestration
- Feedback evaluation pipelines
- Admin analytics dashboard

## Platform Engineering

- Kubernetes deployment
- Helm charts
- Infrastructure as Code (Terraform/Bicep)
- Centralized observability
- Autoscaling

---

# 📚 Key Engineering Decisions

| Decision | Reason |
|---|---|
| Next.js | Modern React framework with production optimizations |
| Docker | Consistent deployment environment |
| Azure App Service | Managed scalable hosting |
| Cosmos DB | Persistent conversation storage |
| Redis | High-speed caching |
| GitHub Actions | Automated CI/CD pipeline |

---

# 👨‍💻 Author

Enterprise AI Platform project focused on:
- AI systems engineering
- cloud-native architecture
- enterprise deployment patterns
- production-grade DevOps
- scalable conversational AI systems

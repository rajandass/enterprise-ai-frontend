'use client'

import {
  useEffect,
  useRef,
  useState
} from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [query, setQuery] = useState('')
const [messages, setMessages] = useState<
  {
    role: string
    content: string
    citations?: string[]
  }[]
>([])

  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [sessionId, setSessionId] =
  useState('')
  const [conversations, setConversations] =
  useState<any[]>([])

  const fetchConversationHistory =
  async (sessionId: string) => {
    const res = await fetch(
      `http://127.0.0.1:8000/conversations/${sessionId}`
    )

    const data = await res.json()

    if (data.messages) {
      const formattedMessages =
        data.messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          citations: msg.citations || []
        }))

      setMessages(formattedMessages)
    }
  }

const fetchConversations = async () => {
  const res = await fetch(
    'http://127.0.0.1:8000/conversations'
  )

  const data = await res.json()
  

  if (data.conversations) {
    setConversations(data.conversations)
  }
}
const startNewChat = () => {
  const newSessionId =
    crypto.randomUUID()

  localStorage.setItem(
    'session_id',
    newSessionId
  )

  setSessionId(newSessionId)

  setMessages([])
}

  const askQuestion = async () => {
  if (!query.trim()) return

  setLoading(true)
  setQuery('')

  setMessages((prev) => [
    ...prev,
    {
      role: 'user',
      content: query
    },
    {
      role: 'assistant',
      content: ''
    }
  ])


  const metadataRes = await fetch(
  'http://127.0.0.1:8000/ask',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'rajandass-enterprise-ai-2026-secure'
    },
    body: JSON.stringify({
      query,
      session_id: sessionId
    })
  }
)

const metadata = await metadataRes.json()
metadata.answer = ''
console.log(metadata)
  const res = await fetch(
    'http://127.0.0.1:8000/ask-stream',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'rajandass-enterprise-ai-2026-secure'
      },
      body: JSON.stringify({
        query,
        session_id: sessionId
      })
    }
  )

  const reader = res.body?.getReader()
  const decoder = new TextDecoder()

  if (!reader) {
    setLoading(false)
    return
  }

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    const chunk = decoder.decode(value, { stream: true })

    setMessages((prev) =>
      prev.map((msg, i) => {
        if (i === prev.length - 1) {
          return {
            ...msg,
            content: msg.content + chunk
          }
        }

        return msg
      })
    )

      }
    
      setMessages((prev) => {
      const updated = [...prev]

      updated[updated.length - 1].citations =
        metadata.citations || []

      return updated
    })

    setLoading(false)

    }
  
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: 'smooth'
  })
}, [messages])
  useEffect(() => {
    let existingSessionId =
      localStorage.getItem('session_id')

    if (!existingSessionId) {
      existingSessionId =
        crypto.randomUUID()

      localStorage.setItem(
        'session_id',
        existingSessionId
      )
    }

    setSessionId(existingSessionId)
    fetchConversationHistory(
        existingSessionId
        )
    fetchConversations()  

  }, [])

return (
  <main className="h-screen bg-black text-white flex overflow-hidden">
    
    {/* Sidebar */}
    <div className="w-80 border-r border-zinc-800 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">
        Conversations
      </h2>
    <button
      onClick={startNewChat}
      className="w-full mb-4 p-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold"
    >
      + New Chat
    </button>
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.session_id}
            onClick={() => {
                  setSessionId(conversation.session_id)

              localStorage.setItem(
                'session_id',
                conversation.session_id
              )

              fetchConversationHistory(
                conversation.session_id
              )
            }}
            className="w-full text-left p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
          >
            <div className="truncate text-sm">
               {conversation.title}
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Chat Area */}
    <div className="flex-1 flex flex-col overflow-hidden">
      
      <div className="max-w-4xl w-full mx-auto flex flex-col h-full p-4">
        
        <h1 className="text-4xl font-bold mb-8">
          Enterprise AI Support Agent
        </h1>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-blue-600 ml-auto max-w-[80%]'
                  : 'bg-zinc-900 border border-zinc-800 max-w-[80%]'
              }`}
            >
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>

                {loading &&
                  index === messages.length - 1 &&
                  message.role === 'assistant' && (
                    <span className="animate-pulse">
                      ▋
                    </span>
                  )}
              </div>

              {message.citations &&
                message.citations.length > 0 && (
                  <div className="mt-4 text-sm text-zinc-400">
                    <div className="font-semibold mb-2">
                      Sources
                    </div>

                    <ul className="list-disc list-inside space-y-1">
                      {message.citations.map(
                        (citation, citationIndex) => (
                          <li key={citationIndex}>
                            {citation}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-zinc-800 pt-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey
              ) {
                e.preventDefault()
                askQuestion()
              }
            }}
            placeholder="Ask a question..."
            className="w-full h-24 bg-zinc-800 rounded-xl p-4 outline-none resize-none"
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="mt-4 px-6 py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {loading
              ? 'Streaming...'
              : 'Ask AI'}
          </button>
        </div>

      </div>
    </div>
  </main>
  )
}
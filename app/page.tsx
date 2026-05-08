'use client'

import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const askQuestion = async () => {
  if (!query.trim()) return

  setLoading(true)
  setResponse('')

  const res = await fetch(
    'http://127.0.0.1:8000/ask-stream',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'rajandass-enterprise-ai-2026-secure'
      },
      body: JSON.stringify({
        query
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

    const chunk = decoder.decode(value)

    setResponse((prev) => prev + chunk)
      }

    setLoading(false)

    }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Enterprise AI Support Agent
        </h1>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="w-full h-32 bg-zinc-800 rounded-xl p-4 outline-none resize-none"
        />
      <button
        onClick={askQuestion}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 disabled:opacity-50"
      >
        {loading ? 'Streaming...' : 'Ask AI'}
      </button>
        <div className="mt-8 bg-zinc-900 rounded-xl p-6 min-h-[200px] border border-zinc-800 whitespace-pre-wrap">
            {response || 'AI response will appear here...'}
        </div>
      </div>
    </main>
  )
}
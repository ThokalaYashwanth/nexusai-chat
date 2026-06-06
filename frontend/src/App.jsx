import { useEffect, useRef, useState } from 'react'
import { useChat } from './hooks/useChat'
import Sidebar from './components/Sidebar'
import MessageBubble, { TypingIndicator } from './components/MessageBubble'
import ChatInput from './components/ChatInput'
import WelcomeScreen from './components/WelcomeScreen'

export default function App() {
  const { messages, sessionId, loading, error, send, newChat, clearChat, loadHistory } = useChat()
  const [darkMode, setDarkMode]   = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const bottomRef                 = useRef(null)

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSelectSession = async (sid) => {
    await loadHistory(sid)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-gray-950">
      {/* Sidebar */}
      <div className="glass border-r border-slate-100 dark:border-gray-800 flex flex-col">
        <Sidebar
          sessionId={sessionId}
          onNewChat={newChat}
          onSelectSession={handleSelectSession}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
        />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="glass border-b border-slate-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {sessionId
                ? <><span className="text-slate-400 dark:text-slate-600 font-normal">Session:</span> {sessionId.slice(0, 8)}…</>
                : 'New conversation'
              }
            </span>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 000 1.5h.3l.815 8.15A1.5 1.5 0 005.357 15h5.285a1.5 1.5 0 001.493-1.35l.815-8.15h.3a.75.75 0 000-1.5H11v-.75A2.25 2.25 0 008.75 1h-1.5A2.25 2.25 0 005 3.25zm2.25-.75a.75.75 0 00-.75.75V4h3v-.75a.75.75 0 00-.75-.75h-1.5z" clipRule="evenodd"/>
                </svg>
                Clear
              </button>
            )}

            <div className="flex items-center gap-1.5 text-xs text-green-500 dark:text-green-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online
            </div>
          </div>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && !loading
            ? <WelcomeScreen />
            : (
              <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {messages.map(msg => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                {loading && <TypingIndicator />}

                {error && (
                  <div className="flex justify-center">
                    <div className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-2.5 rounded-xl max-w-md text-center">
                      {error}
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            )
          }
        </div>

        {/* Input */}
        <ChatInput onSend={send} loading={loading} disabled={false} />
      </div>
    </div>
  )
}

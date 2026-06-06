import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
  'Explain quantum computing in simple terms',
  'Write a Python function to reverse a linked list',
  'What are the key differences between REST and GraphQL?',
  'Help me debug a React useEffect infinite loop',
]

export default function ChatInput({ onSend, loading, disabled }) {
  const [value, setValue]   = useState('')
  const textareaRef         = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px'
    }
  }, [value])

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed || loading || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border-t border-slate-100 dark:border-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* Input box */}
        <div className="flex items-end gap-3 glass rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-brand-400/50 transition-shadow">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything... (Shift+Enter for newline)"
            rows={1}
            disabled={loading || disabled}
            className="flex-1 bg-transparent resize-none outline-none text-[15px] text-slate-800 dark:text-slate-100
                       placeholder:text-slate-400 dark:placeholder:text-slate-600
                       disabled:opacity-50 leading-relaxed max-h-40 overflow-y-auto"
          />
          <button
            onClick={submit}
            disabled={!value.trim() || loading || disabled}
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                       bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-40
                       disabled:cursor-not-allowed transition-all duration-150
                       hover:shadow-md hover:shadow-brand-500/30 active:scale-95"
            title="Send (Enter)"
          >
            {loading
              ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70"/>
                </svg>
              : <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 translate-x-[1px]">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.897 28.897 0 0015.293-7.155.75.75 0 000-1.114A28.897 28.897 0 003.105 2.289z"/>
                </svg>
            }
          </button>
        </div>

        {/* Suggestions (shown when empty) */}
        {!value && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => { setValue(s); textareaRef.current?.focus() }}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-gray-700
                           text-slate-500 dark:text-slate-400 hover:border-brand-300 hover:text-brand-500
                           dark:hover:border-brand-600 dark:hover:text-brand-400 transition-colors
                           hover:bg-brand-50 dark:hover:bg-brand-900/20"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <p className="text-center text-[11px] text-slate-300 dark:text-slate-700 mt-2">
          NexusAI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-sm">
        N
      </div>
      <div className="msg-ai flex items-center gap-1 py-3.5">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  )
}

function Avatar({ role }) {
  if (role === 'user') {
    return (
      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-gray-700 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-300 text-xs font-semibold">
        U
      </div>
    )
  }
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-sm">
      N
    </div>
  )
}

function Timestamp({ iso }) {
  if (!iso) return null
  const d = new Date(iso)
  const t = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  return <span className="text-[11px] text-slate-300 dark:text-slate-600 mt-1 px-1">{t}</span>
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-2 animate-slide-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar role={message.role} />

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {isUser ? (
          <div className="msg-user text-[15px] leading-relaxed">{message.content}</div>
        ) : (
          <div className="msg-ai text-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        <Timestamp iso={message.timestamp} />
      </div>
    </div>
  )
}

export { TypingIndicator }

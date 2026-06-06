import { useState, useEffect } from 'react'
import { getSessions, deleteSession } from '../utils/api'

export default function Sidebar({ sessionId, onNewChat, onSelectSession, darkMode, onToggleDark }) {
  const [sessions, setSessions]   = useState([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    getSessions().then(setSessions).catch(() => {})
  }, [sessionId])

  const handleDelete = async (e, sid) => {
    e.stopPropagation()
    await deleteSession(sid).catch(() => {})
    setSessions(prev => prev.filter(s => s.session_id !== sid))
    if (sid === sessionId) onNewChat()
  }

  const fmt = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  return (
    <aside className={`flex flex-col h-full transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} shrink-0`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm font-semibold">N</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100 tracking-tight">NexusAI</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            {collapsed
              ? <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"/>
              : <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd"/>
            }
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-3 mb-3">
        <button
          onClick={onNewChat}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl
            bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm
            transition-all duration-150 shadow-sm hover:shadow-brand-500/30 hover:shadow-md`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5H3.25a.75.75 0 010-1.5h5.5v-5.5A.75.75 0 0110 3z" clipRule="evenodd"/>
          </svg>
          {!collapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Sessions list */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          {sessions.length > 0 && (
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1 mb-2">Recent</p>
          )}
          {sessions.map(s => (
            <button
              key={s.session_id}
              onClick={() => onSelectSession(s.session_id)}
              className={`w-full text-left group flex items-start gap-2 px-3 py-2.5 rounded-xl text-sm
                transition-all duration-150 relative
                ${s.session_id === sessionId
                  ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800'
                }`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 mt-0.5 opacity-60">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h10a1 1 0 000-2H5zm0 4a1 1 0 000 2h6a1 1 0 000-2H5z" clipRule="evenodd"/>
              </svg>
              <div className="flex-1 min-w-0">
                <p className="truncate leading-snug">
                  {s.last_message || 'Empty chat'}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{fmt(s.created_at)} · {s.message_count} msgs</p>
              </div>
              <button
                onClick={(e) => handleDelete(e, s.session_id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all shrink-0"
                title="Delete session"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 000 1.5h.3l.815 8.15A1.5 1.5 0 005.357 15h5.285a1.5 1.5 0 001.493-1.35l.815-8.15h.3a.75.75 0 000-1.5H11v-.75A2.25 2.25 0 008.75 1h-1.5A2.25 2.25 0 005 3.25zm2.25-.75a.75.75 0 00-.75.75V4h3v-.75a.75.75 0 00-.75-.75h-1.5zM6.05 6a.75.75 0 01.787.713l.275 5.5a.75.75 0 01-1.498.075l-.275-5.5A.75.75 0 016.05 6zm3.9 0a.75.75 0 01.712.787l-.275 5.5a.75.75 0 01-1.498-.075l.275-5.5a.75.75 0 01.786-.711z" clipRule="evenodd"/>
                </svg>
              </button>
            </button>
          ))}
        </div>
      )}

      {/* Bottom controls */}
      <div className={`px-3 py-3 border-t border-slate-100 dark:border-gray-800 flex ${collapsed ? 'justify-center' : 'justify-end'}`}>
        <button
          onClick={onToggleDark}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
          title="Toggle dark mode"
        >
          {darkMode
            ? <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/></svg>
            : <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
          }
        </button>
      </div>
    </aside>
  )
}

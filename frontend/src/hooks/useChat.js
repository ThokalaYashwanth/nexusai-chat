import { useState, useCallback, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { sendMessage, getHistory, clearMessages } from '../utils/api'

const SESSION_KEY = 'nexusai_session_id'

export function useChat() {
  const [messages, setMessages] = useState([])
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem(SESSION_KEY) || null
  })
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const abortRef = useRef(null)

  const loadHistory = useCallback(async (sid) => {
    if (!sid) return
    try {
      const history = await getHistory(sid)
      setMessages(history.map(m => ({
        id: uuidv4(),
        role: m.role,
        content: m.content,
        timestamp: m.timestamp,
      })))
    } catch {
      /* history not critical */
    }
  }, [])

  const send = useCallback(async (text) => {
    if (!text.trim() || loading) return

    const sid = sessionId || uuidv4()
    if (!sessionId) {
      setSessionId(sid)
      localStorage.setItem(SESSION_KEY, sid)
    }

    const userMsg = { id: uuidv4(), role: 'user', content: text, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    setError(null)

    try {
      const data = await sendMessage(sid, text)
      const aiMsg = { id: uuidv4(), role: 'assistant', content: data.reply, timestamp: data.timestamp }
      setMessages(prev => [...prev, aiMsg])
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
      setMessages(prev => prev.filter(m => m.id !== userMsg.id))
    } finally {
      setLoading(false)
    }
  }, [sessionId, loading])

  const newChat = useCallback(async () => {
    const sid = uuidv4()
    setSessionId(sid)
    localStorage.setItem(SESSION_KEY, sid)
    setMessages([])
    setError(null)
  }, [])

  const clearChat = useCallback(async () => {
    if (!sessionId) return
    try { await clearMessages(sessionId) } catch { /* ignore */ }
    setMessages([])
  }, [sessionId])

  return { messages, sessionId, loading, error, send, newChat, clearChat, loadHistory }
}

import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: BASE, timeout: 30000 })

export const sendMessage = (sessionId, message) =>
  api.post('/chat', { session_id: sessionId, message }).then(r => r.data)

export const getHistory = (sessionId) =>
  api.get(`/history/${sessionId}`).then(r => r.data)

export const getSessions = () =>
  api.get('/sessions').then(r => r.data)

export const deleteSession = (sessionId) =>
  api.delete(`/session/${sessionId}`).then(r => r.data)

export const clearMessages = (sessionId) =>
  api.delete(`/session/${sessionId}/messages`).then(r => r.data)

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const verifyClaimAPI = async (claim, useCache = true) => {
  const response = await api.post('/claims/verify', { claim, use_cache: useCache })
  return response.data
}

export const getClaimHistory = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/claims/history?page=${page}&page_size=${pageSize}`)
  return response.data
}

export const deleteClaim = async (claimId) => {
  const response = await api.delete(`/claims/${claimId}`)
  return response.data
}

export default api

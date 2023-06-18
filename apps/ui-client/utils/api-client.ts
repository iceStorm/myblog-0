import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.UI_CLIENT_URL
})

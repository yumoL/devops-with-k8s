import axios from 'axios'
const { REACT_APP_ENV } = process.env

const baseUrl = REACT_APP_ENV === 'dev' ? 'http://localhost:3001/backend' : '/backend'

const getTodos = async () => {
  const res = await axios.get(`${baseUrl}/todos`)
  return res.data
}

const getImage = async () => {
  const res = await axios.get(`${baseUrl}/image`, {responseType: 'blob'})
  return URL.createObjectURL(res.data)
}

const addTodo = async (newTodo) => {
  const res = await axios.post(`${baseUrl}/todos`, newTodo)
  return res.data
}

const updateTodo = async (id) => {
  const res = await axios.put(`${baseUrl}/todos/${id}`)
  return res.data
}

export default {
  getTodos,
  getImage,
  addTodo,
  updateTodo
}


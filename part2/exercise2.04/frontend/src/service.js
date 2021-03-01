import axios from 'axios'

const baseUrl = '/backend'
//const baseUrl = 'http://localhost:3001'

const getTodos = async () => {
  const res = await axios.get(`${baseUrl}/todos`)
  return res.data
}

const getImage = async () => {
  const res = await axios.get(`${baseUrl}/image`)
  return res.data
}

const addTodo = async (newTodo) => {
  const res = await axios.post(`${baseUrl}/todos`, newTodo)
  return res.data
}

export default {
  getTodos,
  getImage,
  addTodo
}


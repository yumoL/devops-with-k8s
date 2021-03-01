const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const fetchFile = require('./controllers/imageController')
const { getTodos, addTodos } = require('./controllers/todoController')

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/files'))

const dir = path.join(__dirname, 'files')
const imageName = 'image.jpg'
const imagePath = path.join(dir, imageName)

app.get('/image', async (request, response) => {
  const imgbase64 = await fetchFile(imagePath)
  response.send(imgbase64)
})

app.get('/todos', (request, response) => {
  const todos = getTodos()
  response.json(todos)
})

app.post('/todos', (request, response) => {
  console.log(request.body)
  const newTodo = request.body
  const addedTodo = addTodos(newTodo)
  response.json(addedTodo)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
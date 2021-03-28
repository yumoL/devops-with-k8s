const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { fetchFile } = require('./controllers/imageController')
const { getTodos, addTodos } = require('./controllers/todoController')
const { request } = require('http')

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/files'))

const dir = path.join(__dirname, 'files')
const imageName = 'image.jpg'
const imagePath = path.join(dir, imageName)

// mainly for GKE ingress health check 
// as this health check requires the server responses 200 at "/"
app.get('/', async (request, response) => {
  response.status(200).send('Server is up')
})

app.get('/backend/image', async (request, response) => {
  await fetchFile(imagePath)
  response.sendFile(imagePath)
})

app.get('/backend/todos', async(request, response) => {
  const todos = await getTodos()
  console.log(`todos: ${todos}`)
  response.send(todos)
})

app.post('/backend/todos', async(request, response) => {
  const newTodo = request.body
  const addedTodo = await addTodos(newTodo)
  response.send(addedTodo)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
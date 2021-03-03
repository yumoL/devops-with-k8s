const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const { fetchFile } = require('./controllers/imageController')
const { getTodos, addTodos } = require('./controllers/todoController')

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/files'))
app.use(morgan('common'))

const dir = path.join(__dirname, 'files')
const imageName = 'image.jpg'
const imagePath = path.join(dir, imageName)

app.get('/image', async (request, response) => {
  await fetchFile(imagePath)
  response.sendFile(imagePath)
})

app.get('/todos', async (request, response) => {
  const todos = await getTodos()
  response.send(todos)
})

app.post('/todos', async (request, response) => {
  const newTodo = request.body
  if (newTodo.content.length > 140) {
    response.status(400).send("invalid content")
    return
  }
  const addedTodo = await addTodos(newTodo)
  response.send(addedTodo)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
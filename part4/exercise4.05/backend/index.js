const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { fetchFile } = require('./controllers/imageController')
const { getTodos, addTodos, markDone } = require('./controllers/todoController')
const morgan = require('morgan')
const { QueryTypes } = require('sequelize')
const { sequelize } = require('./models')

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/files'))
app.use(morgan('common'))

const dir = path.join(__dirname, 'files')
const imageName = 'image.jpg'
const imagePath = path.join(dir, imageName)

// mainly for GKE ingress health check 
// as this health check requires the server responses 200 at "/"
app.get('/', async (request, response) => {
  response.status(200).send('Server is up...')
})

app.get('/backend/image', async (request, response) => {
  await fetchFile(imagePath)
  response.sendFile(imagePath)
})

app.get('/backend/todos', async (request, response) => {
  const todos = await getTodos()
  console.log(`todos: ${todos}`)
  response.send(todos)
})

app.post('/backend/todos', async (request, response) => {
  const newTodo = request.body
  const addedTodo = await addTodos(newTodo)
  response.send(addedTodo)
})

app.put('/backend/todos/:id', async (request, response) => {
  id = request.params.id
  const updatedTodo = await markDone(id)
  response.send(updatedTodo)
})

app.get('/backend/healthz', async (request, response) => {
  try {
    await sequelize.query('select 1', {
      type: QueryTypes.SELECT
    })
    console.log('connects to db')
    return response.sendStatus(200)
  } catch (err) {
    console.error('fails to connect to db')
    return response.sendStatus(500)
  }
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
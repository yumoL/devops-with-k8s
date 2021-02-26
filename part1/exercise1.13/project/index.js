const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const axios = require('axios')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/files'))

//const dir = path.join('/', 'usr', 'src', 'app', 'files')
const dir = path.join(__dirname, 'files')
const imageName = 'image.jpg'
const imagePath = path.join(dir, imageName)

const todos = [
  {
    id: 1,
    content: 'write seminar paper'
  },
  {
    id: 2,
    content: 'play table tennis'
  },
  {
    id: 3,
    content: 'go shopping'
  }
]

const fileExists = async () => new Promise(res => {
  fs.stat(imagePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const fetchFile = async () => {
  if (await fileExists()) return

  const response = await axios.get(
    'https://picsum.photos/200',
    { responseType: 'stream' }
  )
  console.log('fetching')
  response.data.pipe(fs.createWriteStream(imagePath))
}


app.get('/', async (request, response) => {
  await fetchFile()
  response.render('index',{
    todos: todos
  })
  
})

app.get('/', (request, response) => {
  response.send(todos)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
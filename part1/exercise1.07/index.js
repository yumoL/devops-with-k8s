const express = require('express')
const app = express()
const randomStr = require('./randomStr')

setInterval(() => randomStr(true), 5000)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/random', (request, response) => {
    response.send(randomStr())
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
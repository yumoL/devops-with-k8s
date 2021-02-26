const express = require('express')
const app = express()

let count = 0
app.get('/', (request, response) => {
    count++
    response.send(`pong ${count}`)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
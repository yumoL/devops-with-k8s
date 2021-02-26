const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

let count = 0

const dir = path.join('/', 'usr', 'src', 'app', 'files')
//const dir = path.join('')
const filePath = path.join(dir, 'count.txt')

app.get('/', (request, response) => {
    count++
    fs.writeFile(filePath, count.toString(), (err) => {
        if (err) {
            console.log(err)
            return
        }
        response.send(`pong ${count}`)
    })
    
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
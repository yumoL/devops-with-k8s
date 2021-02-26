const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const dir = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(dir, 'tmp.txt')

app.get('/', (request, response) => {
    fs.readFile(filePath, 'utf8', function(err,data){
        if(err){
            return console.log(err)
        }
        response.send(data.split(/\r?\n/))
    })  
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

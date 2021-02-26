const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const randomStr = require('./randomStr')

const dir = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(dir, 'count.txt')
//const filePath = '/home/luoyumo/Desktop/devops-with-k8s/part1/exercise1.11/pingpong-generator/count.txt'

app.get('/', (request, response) => {
    fs.readFile(filePath, 'utf8', function(err,data){
        if(err){
            return console.log(err)
        }
        response.send(randomStr() + '\n' + `ping/pongs: ${data}`)
    })  
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
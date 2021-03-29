const express = require('express')
const axios = require('axios')
const app = express()
const randomStr = require('./randomStr')

const serverUrl = 'http://pingpong-svc:80/pingpong'
//const serverUrl = 'http://localhost:3001/pingpong'

app.get('/healthz', async (request, response) => {
  try {
    await axios.get(serverUrl)
    console.log('connected to backend')
    return response.sendStatus(200)
  } catch (err){
    console.error(`cannot connect to backend: ${err}`)
    return response.sendStatus(500)
  }
})


app.get('/', async (request, response) => {
  const res = await axios.get(serverUrl)
  const data = res.data
  response.send(`${process.env.MESSAGE} <br/> ${randomStr()} <br/> ${data}`)

})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
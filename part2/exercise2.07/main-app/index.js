const express = require('express')
const axios = require('axios')
const app = express()
const randomStr = require('./randomStr')


app.get('/', async (request, response) => {
  const serverUrl = 'http://pingpong-svc:2345'
  const res = await axios.get(serverUrl)
  const data = res.data
  response.send(`${process.env.MESSAGE} <br/> ${randomStr()} <br/> ${data}`)

})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
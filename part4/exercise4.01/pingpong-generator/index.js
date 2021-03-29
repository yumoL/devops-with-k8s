const express = require('express')
const app = express()
const db = require('./models')

db.sequelize.sync()

const Count = db.counts

app.get('/pingpong', async (request, response) => {
  const count = await Count.findOne()

  if (count !== null) {
    const countNumber = count.dataValues.count + 1
    Count.update({ count: countNumber }, {
      where: { id: count.dataValues.id }
    })
    response.send(`ping/pongs: ${countNumber}`)
    return
  }

  await Count.create({ count: 1 })
  response.send('ping/pongs: 1')
})

app.get('/pingpong/healthz', async (request, response) => {
  try {
    await Count.findAll()
    console.log('Connected to db')
    return response.sendStatus(200)   
  } catch(err){
    console.error(`failed to connect to db: ${err}`)
    return response.sendStatus(500)
  }
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
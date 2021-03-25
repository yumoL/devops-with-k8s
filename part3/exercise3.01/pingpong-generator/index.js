const express = require('express')
const app = express()
const db = require('./models')

db.sequelize.sync()
console.log(db.sequelize)

const Count = db.counts

app.get('/', async (request, response) => {
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


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
require('dotenv').config()

console.log('db info')
console.log(`${process.env.DB_HOST} ${process.env.DB_USER} ${process.env.DB_PASSWORD} ${process.env.DB_NAME}`)
module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: 'postgres'
}
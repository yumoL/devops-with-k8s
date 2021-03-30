const fs = require('fs')
const axios = require('axios')

const fileExists = async (imagePath) => new Promise(res => {
  fs.stat(imagePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})


const fetchFile = async (imagePath) => {
  if (await fileExists(imagePath)) return

  const response = await axios.get(
    'https://picsum.photos/200',
    { responseType: 'stream' }
  )
  response.data.pipe(fs.createWriteStream(imagePath))
}

// const readFile = async () => new Promise(res => {
//   fs.readFile(imagePath, (err, buffer) => {
//     if (err) return console.log('FAILED TO READ FILE', '----------------', err)
//     res(buffer)
//   })
// })

// const encodeImg = async (imagePath) => {
//   const imgBase64 = fs.readFileSync(imagePath, { encoding: 'base64' })
//   return imgBase64
// }

module.exports = {
  fetchFile
}

const fs = require('fs')
const axios = require('axios')

const fileExists = async (imagePath) => new Promise(res => {
  fs.stat(imagePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})


const fetchFile = async (imagePath) => {
  if (!await fileExists(imagePath)) {
    const response = await axios.get(
      'https://picsum.photos/200',
      { responseType: 'stream' }
    )
    console.log('fetching')
    response.data.pipe(fs.createWriteStream(imagePath))
  }

  const imgBase64 = fs.readFileSync(imagePath, 'base64')
  return imgBase64
}

module.exports = fetchFile
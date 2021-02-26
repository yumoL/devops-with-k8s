const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const dir = path.join('/', 'usr', 'src', 'app', 'files')
//const dir = path.join('')
const imageName = 'image.jpg'
const imagePath = path.join(dir, imageName)

const fileExists = async () => new Promise(res => {
    fs.stat(imagePath, (err, stats) => {
      if (err || !stats) return res(false)
      return res(true)
    })
  })

const fetchFile = async () => {
    if (await fileExists()) return

    const response = await axios.get(
        'https://picsum.photos/200',
        { responseType: 'stream' }
    )
    console.log('fetching')
    response.data.pipe(fs.createWriteStream(imagePath))
}


app.get('/', async(request, response) => {
    await fetchFile()

    const options = {
        root: dir,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent':true
        }
    }
    response.sendFile(imageName, options, (err) => {
        if(err) {
            console.log(err)
            return
        }
    })
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})
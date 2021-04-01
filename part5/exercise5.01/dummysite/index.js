const scrape = require('website-scraper');
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const htmlDir = path.join(__dirname, 'public')

app.use(express.static('public'))

let options = {
  urls: [process.argv[2] || 'https://www.example.fi/'],
  directory: htmlDir,
};

if(fs.existsSync(htmlDir)){
  console.log('Delete old pages')
  fs.rmdirSync(htmlDir, {recursive:true})
}

scrapeByUrl = async() => {
  try{
    await scrape(options)
    console.log('The website was copied')
  } catch (err){
    console.log(`Failed to fetch the website: ${err}`)
  } 
}

app.get('/', async (request, response) => {
  await scrapeByUrl()
  response.sendFile('index.html', {root: htmlDir})
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})



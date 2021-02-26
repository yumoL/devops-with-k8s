const fs = require('fs')
const path = require('path')
const randomStr = require('./randomStr')

const dir = path.join('/', 'usr', 'src', 'app', 'files')

const filePath = path.join(dir, 'tmp.txt')

const writeToFile = () => {
    fs.appendFile(filePath, randomStr() + '\n', (err) => {
        if (err) {
            console.log(err)
            return
        }
    })
}

setInterval(() => writeToFile(), 5000)

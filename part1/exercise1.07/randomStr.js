const { v4: uuidv4 } = require('uuid');

const str = uuidv4()

function randomStr(log) {
    const timeStamp = new Date().toISOString()
    
    if (log) {
        console.log(`${timeStamp}: ${str}`)
    }
    else {
        return `${timeStamp}: ${str}`
    }
}


module.exports = randomStr
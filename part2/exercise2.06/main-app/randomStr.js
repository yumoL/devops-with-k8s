const { v4: uuidv4 } = require('uuid');

const str = uuidv4()

const randomStr = () => {
    const timeStamp = new Date().toISOString()
    return `${timeStamp}: ${str}`    
}


module.exports = randomStr
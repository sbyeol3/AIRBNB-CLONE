const fs = require('fs')
const data = require('./data1.json')

const newData = data.map((item)=> {
    const maxGuest = Math.floor(Math.random() * 15) + 1
    return {
        ...item,
        maxGuest,
    }
})

const newJson = JSON.stringify(newData)
fs.writeFileSync('./data2.json', newJson)
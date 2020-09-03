const fs = require('fs')
const data = require('./data.json')

const newData = data.map((item)=> {
    const review = Math.floor(Math.random() * 150) + 2
    const score = (Math.random() * 5 + 1).toFixed(2)
    return {
        ...item,
        review,
        score
    }
})

const newJson = JSON.stringify(newData)
fs.writeFileSync('./data1.json', newJson)
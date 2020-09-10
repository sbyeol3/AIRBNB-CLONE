const fs = require('fs')
const data = require('./data2.json')

const newData = data.map((item)=> {
    const maxGuest = Math.floor(Math.random() * 15) + 1
    return {
        ...item,
        maxGuest,
    }
})

const priceRegexp = /\₩(\d|\,){1,}/g
const updatePrice = data.map((item) => {
    const {price} = item
    const [original, reduced] = price.match(priceRegexp)
    if (reduced) {
        return {
            ...item,
            originalPrice: original,
            price: reduced
        }
    } else {
        return {
            ...item,
            price: original
        }
    }
})

const newJson = JSON.stringify(updatePrice)
fs.writeFileSync('./data3.json', newJson)
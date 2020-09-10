const fs = require('fs')
const data = require('./data2.json')

const newData = data.map((item)=> {
    const maxGuest = Math.floor(Math.random() * 15) + 1
    return {
        ...item,
        maxGuest,
    }
})

const priceRegexp = /\₩(\d|\,){1,}/g // 문자열에서 ₩00,000 포맷으로 되어있는 가격을 가져오는 정규식
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

const updateID = updatePrice.map((item, id) => {
    return {
        ...item,
        id
    }
})

const newJson = JSON.stringify(updateID)
fs.writeFileSync('./data3.json', newJson)
const express = require('express')
const router = express.Router()
const data = require('../database/data1.json')
const { checkSidinSessionDB } = require('../models/userData')

router.get('/', async (req, res) => {
    const sid = req.cookies.sid
    const validSid = await checkSidinSessionDB(sid)

    const keyword = req.query
    const { location } = keyword

    const result = data.filter((value)=> {
        const {place} = value
        if (place === location) return true
        return false
    })

    res.render('search', {isLoggedIn:validSid, data: result, location, length: result.length})
})

module.exports = router
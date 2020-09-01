const express = require('express')
const router = express.Router()
const { checkSidinSessionDB } = require('../models/userData')

router.get('/', async (req, res) => {
    const sid = req.cookies.sid
    const validSid = await checkSidinSessionDB(sid)
    console.log(validSid)
    res.render('index')
})

module.exports = router
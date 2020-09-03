const express = require('express')
const router = express.Router()
const { checkSidinSessionDB, deleteSessionId } = require('../models/userData')

router.get('/', async (req, res) => {
    const sid = req.cookies.sid
    const validSid = await checkSidinSessionDB(sid)
    res.render('index', {isLoggedIn: validSid})
})

router.get('/logout', async (req, res) => {
    const result = await deleteSessionId(req.cookies.sid)
    if(result) {
        res.clearCookie('sid')
        res.redirect('/')
    } else res.redirect('/')
})

module.exports = router
const express = require('express')
const router = express.Router()
const { checkDatainUserDB, createNewSession, insertNewSessionID, checkSidinSessionDB } = require('../models/userData')

router.use('/', async (req, res, next)=> {
    const sid = req.cookies.sid
    const validSid = await checkSidinSessionDB(sid)
    if(validSid) res.redirect('/')
    else next()
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.status(200).render('login', {isFailed: false})
})

router.post('/login', async (req, res) => {
    const { body: {email, password} } = req
    if (!email || !password) res.redirect('/users/login')
    else {
        const userID = await checkDatainUserDB(email,password)
        if (userID) {
            res.status(200)
            const sid = createNewSession()
            res.cookie('sid', sid)
            const insertResult = await insertNewSessionID(sid, userID)
            res.redirect('/')
        } else {
            res.status(400)
            res.render('login', {isFailed: true})
        }
    } 
})

module.exports = router
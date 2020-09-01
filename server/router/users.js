const express = require('express')
const router = express.Router()
const { checkDatainUserDB, createNewSession, insertNewSessionID } = require('../models/userData')

router.get('/register', (req, res) => {
    // console.log(req)
    res.render('register')
})

router.get('/login', (req, res) => {
    // console.log(req)
    res.render('login')
})

router.post('/login', async (req, res) => {
    const { body: {email, password} } = req
    console.log(email, password)
    if (!email || !password) res.redirect('/users/login')
    else {
        const userID = await checkDatainUserDB(email,password)
        console.log(userID)
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
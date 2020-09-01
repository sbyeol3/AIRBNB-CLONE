const express = require('express')
const router = express.Router()
const { checkDatainUserDB, createNewSession } = require('../models/userData')

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
    if (!email || !password) res.redirect('/users/login')
    else {
        const checkResult = await checkDatainUserDB(email,password)
        if (checkResult) {
            res.status(200)
            const sid = createNewSession()
            res.cookie('sid', sid)
            res.redirect('/')
        } else {
            res.status(400)
        }
    } 
})

module.exports = router
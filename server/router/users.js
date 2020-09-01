const express = require('express')
const router = express.Router()
const {userdb} = require('../models/userData')

router.get('/register', (req, res) => {
    // console.log(req)
    res.render('register')
})

router.get('/login', (req, res) => {
    // console.log(req)
    res.render('login')
})

router.post('/login', (req, res) => {
    const { body: {email, password} } = req
    if (!email || !password) res.redirect('/users/login')
    else {

    } 
})

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
    // console.log(req)
    res.render('register')
})

router.get('/login', (req, res) => {
    // console.log(req)
    res.render('login')
})

router.post('/login', (req, res) => {
    const { body, url } = req
    console.log(body, url)
    // res.render('login')
})

module.exports = router
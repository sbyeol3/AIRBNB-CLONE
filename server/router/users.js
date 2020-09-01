const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
    console.log(req)
    res.render('register')
})

module.exports = router
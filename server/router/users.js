const express = require('express')
const router = express.Router()
const { checkDatainUserDB, createNewSession, insertNewSessionID, checkSidinSessionDB, isValidNewEmail, createNewUser } = require('../models/userData')

router.use('/', async (req, res, next)=> {
    const sid = req.cookies.sid
    const validSid = await checkSidinSessionDB(sid)
    if(validSid) res.redirect('/')
    else next()
})

router.get('/register', (req, res) => {
    res.status(200).render('index', {isDuplicated: false, registerModal: true})
})

router.post('/register', async (req, res) => {
    const { body: {email} } = req
    const isValidEmail = await isValidNewEmail(email)
    console.log(isValidEmail)
    if (isValidEmail) {
        res.status(200)
        const userId = await createNewUser(req.body)
        if (userId) {
            const sid = createNewSession()
            const age = await insertNewSessionID(sid, userId)
            res.cookie('sid', sid, {maxAge: 1800})
            res.redirect('/')
        } else {
            res.status(500)
            res.render('register', {error: true})
        }
    } else {
        res.status(400)
        res.render('register', {isDuplicated: true})
    }
})

router.get('/login', (req, res) => {
    res.status(200).render('index', {isFailed: false, loginModal: true})
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
            const age = await insertNewSessionID(sid, userID)
            res.cookie('sid', sid, {maxAge: 1800})
            res.redirect('/')
        } else {
            res.status(400)
            res.render('login', {isFailed: true})
        }
    } 
})

module.exports = router
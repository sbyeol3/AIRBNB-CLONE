const DataStore = require('nedb')
const userdb = new DataStore({filename: 'user.db', autoload: true})
const sessiondb = new DataStore({filename: 'session.db', autoload: true})

const user = {
    email: 'master@naver.com',
    password: 'master'
}

userdb.insert(user, (err, doc) => {
    console.log(doc)
})

const checkDatainUserDB = (email, password) => {
    return new Promise((resolve, reject) => {
        userdb.find({email, password}, (err, doc) => {
            if (err) reject(err)
            if (doc.length !== 0) resolve(true)
            resolve(false)
        })
    }) 
}

const createNewSession = () => {
    const now = new Date()
    let sid = ''
    for (let i=0;i<10;i++) {
        const randomCode = Math.floor(Math.random()* 25 + 65) + 1
        sid += String.fromCharCode(randomCode)
    }
    return `${sid}${now.getTime()}`
}

module.exports = { userdb, sessiondb, checkDatainUserDB, createNewSession}
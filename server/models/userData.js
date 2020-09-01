const DataStore = require('nedb')
const userdb = new DataStore({filename: 'user.db', autoload: true})
const sessiondb = new DataStore({filename: 'session.db', autoload: true})
const userInfodb = new DataStore({filename: 'userInfo.db', autoload: true})

const user = {
    email: 'master@naver.com',
    password: 'master'
}

// userdb.insert(user, (err, doc) => {
//     console.log(doc)
// })

const insertNewSessionID = (sid, userID) => {
    return new Promise((resolve, reject) => {
        sessiondb.insert({_id: sid, userID},(err) => {
            if (err) reject(err)
            resolve(true)
        })
    })
}

const checkSidinSessionDB = (sid) => {
    return new Promise((resolve, reject) => {
        sessiondb.find({_id: sid}, (err, doc) => {
            if (err) reject(err)
            if (doc.length !== 0) resolve(true)
            resolve(false)
        })
    }) 
}

const checkDatainUserDB = (email, password) => {
    return new Promise((resolve, reject) => {
        userdb.find({email, password}, (err, doc) => {
            if (err) reject(err)
            if (doc.length > 0) resolve(doc[0]._id)
            resolve(null)
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

module.exports = { checkDatainUserDB, createNewSession, insertNewSessionID, checkSidinSessionDB }
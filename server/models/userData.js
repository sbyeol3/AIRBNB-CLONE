const DataStore = require('nedb')
const cryptoJS = require("crypto-js")
const userdb = new DataStore({filename: './database/user.db', autoload: true})
const sessiondb = new DataStore({filename: './database/session.db', autoload: true})
const userInfodb = new DataStore({filename: './database/userInfo.db', autoload: true})

const user = {
    email: 'master@naver.com',
    password: 'master'
}

const insertNewSessionID = (sid, userID) => {
    const age = new Date().getTime() + 1800000
    return new Promise((resolve, reject) => {
        sessiondb.insert({_id: sid, userID, age},(err) => {
            if (err) reject(err)
            resolve(age)
        })
    })
}

const deleteSessionId = (sid) => {
    return new Promise((resolve, reject) => {
        sessiondb.remove({_id: sid},(err) => {
            if (err) resolve(false)
            resolve(true)
        })
    })
}

const isValidNewEmail = (email) => {
    return new Promise((resolve, reject) => {
        userdb.find({email}, (err, doc) => {
            console.log('find doc', doc)
            if (err) reject(err)
            if (doc.length === 0) resolve(true)
            resolve(false)
        })
    }) 
}

const createNewUser = async(data) => {
    const {email, password} = data
    const encryptedPassword = cryptoJS.AES.encrypt(password, 'boostcamp').toString();
    const userId = await insertNewUser(email, encryptedPassword)
    const result = await insertNewUserInfo(userId, {...data, password: encryptedPassword})
    return new Promise((resolve, reject) => {
        if (result) resolve(userId)
        reject('not completed create user')
    })
}

const insertNewUser = (email, password) => {
    return new Promise((resolve, reject) => {
        userdb.insert({email, password},(err, doc) => {
            if (err) reject(err)
            resolve(doc._id)
        })
    })
}

const insertNewUserInfo = (id, data) => {
    return new Promise((resolve, reject) => {
        const {marketing} = data
        const message = (marketing === 'on') ? false : true
        userInfodb.insert({_id: id, ...data, marketing: message},(err, doc) => {
            if (err) reject(err)
            resolve(true)
        })
    })
}

const checkSidinSessionDB = (sid) => {
    return new Promise((resolve, reject) => {
        sessiondb.find({_id: sid}, (err, doc) => {
            if (err) reject(err)
            if (doc.length !== 0) {
                console.log(doc[0].age, new Date().getTime())
                if (doc[0].age > new Date().getTime()) resolve(true)
                else resolve(false)
            }
            resolve(false)
        })
    }) 
}

const checkDatainUserDB = (email, password) => {
    return new Promise((resolve, reject) => {
        userdb.find({email}, (err, doc) => {
            if (err) reject(err)
            if (doc.length > 0) {
                const cipher = doc[0].password
                const bytes  = cryptoJS.AES.decrypt(cipher, 'boostcamp')
                const decrypted = bytes.toString(cryptoJS.enc.Utf8)
                if (decrypted === password) resolve(doc[0]._id)
            }
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

module.exports = { checkDatainUserDB, createNewSession, insertNewSessionID, checkSidinSessionDB, isValidNewEmail, createNewUser, deleteSessionId }
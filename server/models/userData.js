const DataStore = require('nedb')
const userdb = new DataStore({filename: 'user.db', autoload: true})
const sessiondb = new DataStore({filename: 'session.db', autoload: true})

module.exports = { userdb, sessiondb}
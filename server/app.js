const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const DataStore = require('nedb')

const mainRouter = require('./router/index.js')
const userRouter = require('./router/users.js')

app.set('view engine', 'pug')
app.use('/css', express.static('./views/css'))
app.use('/js', express.static('./views/js'))
app.use('/static', express.static('./views/static'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', mainRouter)
app.use('/users', userRouter)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}...`)
})

module.exports = { DataStore, app }
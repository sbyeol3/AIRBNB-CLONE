const createError = require('http-errors');
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()
const port = 5000

const DataStore = require('nedb')

const mainRouter = require('./router/index.js')
const userRouter = require('./router/users.js')
const searchRouter = require('./router/search.js')

app.use(logger('dev'))
app.set('view engine', 'pug')
app.use('/css', express.static('./views/css'))
app.use('/js', express.static('./views/js'))
app.use('/static', express.static('./views/static'))

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', mainRouter)
app.use('/users', userRouter)
app.use('/search', searchRouter)

app.use((req, res, next) => {
  next(createError(404));
})
 
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
 
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}...`)
})

module.exports = { DataStore, app }
const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const route = require('./router.js')

app.set('view engine', 'pug')
app.use('/css', express.static('./views/css'));
app.use('/static', express.static('./views/static'));

app.use('/', route);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
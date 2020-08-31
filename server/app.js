const express = require('express')
const app = express()
const port = 3000
const route = require('./router.js')

app.set('view engine', 'pug')

app.use('/', route);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
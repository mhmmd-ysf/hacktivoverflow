require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const { CronJob } = require('cron')
mongoose.connect('mongodb://localhost:27017/hacktivoverflow',{useNewUrlParser : true})
  .then(connected => {
    console.log('Connected to database!')
  })
  .catch(err => {
    console.log({err})
  })

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(route)
app.listen(port,() => {
  console.log(`listening on port: ${port}!`)
})

let i = 1
new CronJob('* * * * * *', function() {
  console.log(i)
  i++
}, null, true)
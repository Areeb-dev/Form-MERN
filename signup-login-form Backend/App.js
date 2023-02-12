const express = require('express')
const app = express()
let cors = require('cors')
const { mongoose } = require('./config')
const signupRoute = require('./routes/signUpRoute.js')
const signInRoute = require('./routes/signInRoutes')

var db = mongoose.connection
db.on('error', (err) => {
  console.log('err', err)
})

db.on('open', async () => {
  console.log('DB running')
})

app.use(cors())
app.use(express.json())

app.use('/api', require('./routes'))


app.listen(4000, () => {
  console.log('Server is working')
})

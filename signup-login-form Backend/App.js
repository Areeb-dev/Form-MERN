const express = require("express")
const app = express()
const { mongoose } = require('./config')
const signupRoute = require("./routes/signUpRoute.js")
const signInRoute = require("./routes/signInRoutes")

var db = mongoose.connection
db.on('error', (err) => {
  console.log('err', err)
})

db.on('open', async () => {
  console.log('DB running')
})

let cors = require("cors")
app.use(cors())
app.use(express.json())

app.use("/", signupRoute)
app.use("/", signInRoute)

app.listen(4000, () => {
  console.log("Server is working")
})

/////////////////CONFIG/////////////////////////////////////////////////////////

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
const db = mongoose.connection
require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI


/////////////////MIDWARE////////////////////////////////////////////////////////


app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(  session({
    secret: process.env.SECRET,
    
    resave: false,
    saveUninitialized: false,
  })
)


/////////////////CONTROLLERS///////////////////////////////////////////////////
const plantsController = require('./controllers/plants.js')
app.use(plantsController)
const userController = require('./controllers/users_controller.js')
app.use('/users',userController)
const sessionsController =require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

/////////////////CONNECTION/////////////////////////////////////////////////////

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})


db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})

////////////////////////////////////////////////////////////////////////////////
/////////////////CONFIG/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const Item = require('./models/items.js')
const db = mongoose.connection
require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI

////////////////////////////////////////////////////////////////////////////////
/////////////////MIDWARE////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

////////////////////////////////////////////////////////////////////////////////
/////////////////ROUTES////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/////////////////EDIT////////////////////////////////////////////////////////
app.get('/items/:id/edit',(req,res) => {
  Item.findById(req.params.id,(error,foundItem) => {
    res.render(
       'edit.ejs',
       {
         item:foundItem
       }
    )
  })

})
/////////////////PUT////////////////////////////////////////////////////////////

app.put('/items/:id',(req,res) => {
  Item.findByIdAndUpdate(req.params.id,req.body,{new:true},(error,updatedModel) => {
    res.redirect('/items')
  })
  

})


/////////////////SEED////////////////////////////////////////////////////////
app.get('/items/seed',(req,res) => {
  Item.create(
    {
      name: 'Sword',
      info: 'you carried prior to washing ashore on the island',
      img: String,
      qty: 1
    },
    {
      name: 'Boomerang',
      info: 'Throw it anywhere you want. It always comes back',
      img: String,
      qty: 1
    },
    {
      name: 'Power Bracelet',
      info: ' A mysterious bracelet that surges with power.',
      img: String,
      qty: 1
    },
    {
      name: 'Pegasus Boots',
      info: 'Put on a burst of speed with L. You can jump further too!',
      img: String,
      qty: 1
     }
  )

})


/////////////////INDEX////////////////////////////////////////////////////////

app.get('/items',(req, res) => {
   Item.find({}, (error, allItems) => {
       res.render(
         'index.ejs',
         {
           items: allItems
         }

       )
   })

})

/////////////////NEW ITEM////////////////////////////////////////////////////////
app.get('/items/new', (req, res) => {
  res.render('new.ejs')
})
/////////////////CREATE////////////////////////////////////////////////////////

app.post('/items',(req,res) => {
   Item.create(req.body, (error, createdItem) => {
     res.redirect('/items')
   })
})



/////////////////SHOW////////////////////////////////////////////////////////
app.get('/items/:id',(req,res) => {
  Item.findById(req.params.id,(error, foundItem) => {
    res.render(
         'show.ejs',
         {
           item:foundItem
         }
    )

  })

})

/////////////////DELETE////////////////////////////////////////////////////////

app.delete('/items/:id',(req,res) => {
  Item.findByIdAndRemove(req.params.id,(error,data) => {
    res.redirect('/items');
  })


})


////////////////////////////////////////////////////////////////////////////////
/////////////////CONNECTION/////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
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

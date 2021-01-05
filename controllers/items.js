const express = require('express')
const router = express.Router()
const Item = require('../models/items.js')
////////////////////////////////////////////////////////////////////////////////
/////////////////ROUTES////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

router.get('/',(req,res) => {
  res.redirect("/items")

})
/////////////////EDIT////////////////////////////////////////////////////////
router.get('/items/:id/edit',(req,res) => {
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

router.put('/items/:id',(req,res) => {
  Item.findByIdAndUpdate(req.params.id,req.body,{new:true},(error,updatedModel) => {
    res.redirect('/items')
  })


})


/////////////////SEED////////////////////////////////////////////////////////
router.get('/items/seed',(req,res) => {
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

router.get('/items',(req, res) => {
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
router.get('/items/new', (req, res) => {
  res.render('new.ejs')
})
/////////////////CREATE////////////////////////////////////////////////////////

router.post('/items',(req,res) => {
   Item.create(req.body, (error, createdItem) => {
     res.redirect('/items')
   })
})



/////////////////SHOW////////////////////////////////////////////////////////
router.get('/items/:id',(req,res) => {
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

router.delete('/items/:id',(req,res) => {
  Item.findByIdAndRemove(req.params.id,(error,data) => {
    res.redirect('/items');
  })


})


module.exports = router;

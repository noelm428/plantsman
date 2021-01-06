const express = require('express')
const router = express.Router()
const Plant = require('../models/plants.js')
////////////////////////////////////////////////////////////////////////////////
/////////////////ROUTES////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

router.get('/',(req,res) => {
  res.redirect("/plants")

})
/////////////////EDIT////////////////////////////////////////////////////////
router.get('/plants/:id/edit',(req,res) => {
  Plant.findById(req.params.id,(error,foundPlant) => {
    res.render(
       'edit.ejs',
       {
         plant:foundPlant
       }
    )
  })

})
/////////////////PUT////////////////////////////////////////////////////////////

router.put('/plants/:id',(req,res) => {
  Plant.findByIdAndUpdate(req.params.id,req.body,{new:true},(error,updatedModel) => {
    res.redirect('/plants')
  })


})


/////////////////SEED////////////////////////////////////////////////////////
router.get('/plants/seed',(req,res) => {
  Plant.create(
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

router.get('/plants',(req, res) => {
   Plant.find({}, (error, allPlants) => {
       res.render(
         'index.ejs',
         {
           plants: allPlants
         }

       )
   })

})

/////////////////NEW Plant////////////////////////////////////////////////////////
router.get('/plants/new', (req, res) => {
  res.render('new.ejs')
})
/////////////////CREATE////////////////////////////////////////////////////////

router.post('/plants',(req,res) => {
   Plant.create(req.body, (error, createdPlant) => {
     res.redirect('/plants')
   })
})



/////////////////SHOW////////////////////////////////////////////////////////
router.get('/plants/:id',(req,res) => {
  Plant.findById(req.params.id,(error, foundPlant) => {
    res.render(
         'show.ejs',
         {
           plant:foundPlant
         }
    )

  })

})

/////////////////DELETE////////////////////////////////////////////////////////

router.delete('/plants/:id',(req,res) => {
  Plant.findByIdAndRemove(req.params.id,(error,data) => {
    res.redirect('/plants');
  })


})


module.exports = router;

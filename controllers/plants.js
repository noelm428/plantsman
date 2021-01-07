const express = require('express')
const router = express.Router()
const Plant = require('../models/plants.js')
////////////////////////////////////////////////////////////////////////////////
/////////////////ROUTES////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  res.redirect("/plants")

})
/////////////////EDIT////////////////////////////////////////////////////////
router.get('/plants/:id/edit', (req, res) => {
  Plant.findById(req.params.id, (error, foundPlant) => {
    res.render(
      'edit.ejs', {
        plant: foundPlant,
        // currentUser: req.session.currentUser
      }
    )
  })

})
/////////////////PUT////////////////////////////////////////////////////////////

router.put('/plants/:id', (req, res) => {
  Plant.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedModel) => {
    res.redirect('/plants')
  })


})


/////////////////SEED////////////////////////////////////////////////////////
router.get('/plants/seed', (req, res) => {
  Plant.create({
    name: 'Monstera Deliciosa',
    info: 'It is the very best houseplant. It can survive your neglect and laziness!',
    care: 'Thrives in bright to medium indirect light.Water every 1-2 weeks, allowing soil to dry out between waterings. Expect to water more often in brighter light and less often in lower light. ',
    img: 'https://image.freepik.com/free-vector/monstera-deliciosa-also-known-as-swiss-cheese-plant-hand-draw-sketch-vector_37445-754.jpg',
    qty: 1
  }, {
    name: 'Yucca Palm',
    info: 'Many recognize Yucca Palm for its ease of care. It is a low-maintenance houseplant.',
    care: 'It likes bright, indirect sunlight best. However, this hardy plant also tolerates low light conditions.Water the palm plant only when the top layer of the soil dries. Reduce watering in colder months.',
    img: 'https://static.vecteezy.com/system/resources/previews/000/143/562/original/vector-free-yucca-plant-collections.jpg',
    qty: 1
  }, {
    name: 'Sansevieria trifasciata aka "Snake plant"',
    info: ' is commonly called "mother-in-law\'s tongue", "Saint George\'s sword" or "snake plant", because of the shape and sharp margins of its leaves. It is also known as the "viper\'s bowstring hemp", because it is one of the sources for plant fibers used to make bowstrings.',
    care: 'Water when the soil dries out. The best way to tell when your plant needs watering is to touch the soil every week. When the first inch of the soil feels dry, it\'s time to water.',
    img: 'https://i.etsystatic.com/17629781/r/il/e3fd2a/2466011963/il_794xN.2466011963_cfnj.jpg',
    qty: 1
  }, {
    name: 'Pegasus Boots',
    info: 'Put on a burst of speed with L. You can jump further too!',
    img: String,
    care: String,
    qty: 1
  })

})


/////////////////INDEX////////////////////////////////////////////////////////

router.get('/plants', (req, res) => {
  Plant.find({}, (error, allPlants) => {
    res.render(
      'index.ejs', {
        plants: allPlants,
        // currentUser: req.session.currentUser
      }

    )
  })

})

/////////////////NEW Plant////////////////////////////////////////////////////////

router.get('/plants/new', (req, res) => {
  res.render('new.ejs', {
    // currentUser: req.session.currentUser
  })
})

/////////////////CREATE////////////////////////////////////////////////////////

router.post('/plants', (req, res) => {
  Plant.create(req.body, (error, createdPlant) => {
    res.redirect('/plants')
  })
})



/////////////////SHOW////////////////////////////////////////////////////////
router.get('/plants/:id', (req, res) => {
  // if (req.session.currentUser) {
    Plant.findById(req.params.id, (error, foundPlant) => {
      res.render(
        'show.ejs', {
          plant: foundPlant,
          // currentUser: req.session.currentUser
        }
      )
    })

  // } else{
  //   res.redirect('/sessions/new')
  //
  // }


})

/////////////////DELETE////////////////////////////////////////////////////////

router.delete('/plants/:id', (req, res) => {
  Plant.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/plants');
  })


})


module.exports = router;

/////////////////CONFIG////////////////////////////////////////////////////////

const express = require('express')
const router = express.Router()
const Plant = require('../models/plants.js')

const isAuth = (req,res,next) => {
  if(req.session.currentUser){
    return next()
  }else{
    res.redirect('/sessions/new')
  }

}

/////////////////ROUTES////////////////////////////////////////////////////////


router.get('/', (req, res) => {
  res.redirect("/plants")

})
/////////////////EDIT////////////////////////////////////////////////////////
router.get('/plants/:id/edit', (req, res) => {
  Plant.findById(req.params.id, (error, foundPlant) => {
    res.render(
      'edit.ejs', {
        plant: foundPlant,
        currentUser: req.session.currentUser
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
    name:  "Snake plant",
    info: ' is commonly called "mother-in-law\'s tongue',
    care: 'Water when the soil dries out. The best way to tell when your plant needs watering is to touch the soil every week. When the first inch of the soil feels dry, it\'s time to water.',
    img: 'https://i.etsystatic.com/17629781/r/il/e3fd2a/2466011963/il_794xN.2466011963_cfnj.jpg',
    qty: 1
  },
  {
    name: 'Audrey II',
    info: ' Audrey II is a very cruel, greedy, uncaring, avaricious, manipulative, heartless.',
    care: 'FeedMeSeymour',
    img: 'https://theatre.niagara.edu/assets/Productions/_resampled/ScaleWidthWyI4MDAiXQ/LSoH-5x7-web.jpg',
    qty: 7
  },{
    name: 'Cactus',
    info: 'spikey yet fun',
    img: 'https://render.fineartamerica.com/images/rendered/default/print/6/8/break/images/artworkimages/medium/1/saguaro-cactus-shanon-rifenbery.jpg',
    care: 'low maintenance water once a month, give it plenty of sun',
    qty: 1
  })

})


/////////////////INDEX////////////////////////////////////////////////////////

router.get('/plants', (req, res) => {
  Plant.find({}, (error, allPlant) => {
    res.render(
      'index.ejs', {
        plant: allPlant,
        currentUser: req.session.currentUser
      }

    )
  })

})

/////////////////NEW Plant////////////////////////////////////////////////////////

router.get('/plants/new',isAuth, (req, res) => {
   res.render('new.ejs', {
      currentUser: req.session.currentUser
    })

})

/////////////////CREATE////////////////////////////////////////////////////////

router.post('/plants', (req, res) => {
  Plant.create(req.body, (error, createdPlant) => {
    res.redirect('/plants')
  })
})



/////////////////SHOW////////////////////////////////////////////////////////
router.get('/plants/:id',isAuth, (req, res) => {
  Plant.findById(req.params.id, (error, foundPlant) => {
      res.render(
        'show.ejs', {
          plant: foundPlant,
          currentUser: req.session.currentUser
        }
      )
    })
})

/////////////////DELETE////////////////////////////////////////////////////////

router.delete('/plants/:id',isAuth, (req, res) => {
  Plant.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/plants');
  })


})


module.exports = router;

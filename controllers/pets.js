const express = require('express')
const router = express.Router()
const app = express ()
const Pet = require('../models/pets.js')
const petSeeds = require('../models/seed.js')



router.get('/pets', (req, res)=> {
  res.send('/pets')
  // Pet.find({}, (error, allPets)=> {
  //   res.render('index.ejs', {
  //    pets: allPets,
  //     currentUser: req.session.currentUser,
  //   })
  // })
})

router.get('/pets/all', (req, res)=> {
  Pet.find({}, (error, pets)=> {
    res.render('all.ejs', {
      pets: pets,
      currentUser: req.session.currentUser,
    })
  })
})


router.get('/pets/dogs', (req, res)=> {
  Pet.find({type: "dog"}, (error, dogs)=> {
    res.render('dogs.ejs', {
      dogs: dogs,
      currentUser: req.session.currentUser,
    })
  })
})

router.get('/pets/cats', (req, res)=> {
  Pet.find({type: "cat"}, (error, cats)=> {
    res.render('cats.ejs', {
      cats: cats,
      currentUser: req.session.currentUser,
    })
  })
})


//new: get
router.get('/pets/new', (req, res)=> {
  res.render('new.ejs',
{currentUser: req.session.currentUser})
})

// Get - show
router.get('/pets/:id', (req, res)=> {
  Pet.findById(req.params.id, (err, showPets)=> {
    res.render('show.ejs', {
      pets: showPets,
      currentUser: req.session.currentUser})
  })
})

//POST - create
// '/pets'
router.post('/pets/all', (req, res)=> {
  Pet.create(req.body, (err, pet)=> {
    if(err){res.send (err)}
    else {
      res.redirect('/pets/' + pet.id)
    }
  })
})

//Get - edit
// '/pets/:id/edit'
router.get('/pets/:id/edit', (req, res)=> {
  Pet.findById(req.params.id, (err, pets)=> {
    if(err) {console.log(errs)}
    res.render('edit.ejs', {pets:pets,
    currentUser: req.session.currentUser})
  })
})


//Patch/PUT - Update
// '/pets/:id'
router.put('/pets/:id', (req, res)=> {
  Pet.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, pet)=> { if (err) {console.log(err);}
  res.redirect('/pets/' + pet.id)
  })
})


//DELETE - Destroy
// '/pets/:id'
router.delete('/pets/:id', (req, res)=> {
  Pet.findByIdAndRemove(req.params.id, (err, pets)=> {
    if(err){console.log(err)}
    res.redirect('/pets')
  })
})


router.get('/seed', (req, res)=> {
  Pet.create(petSeeds, (err, pets)=> {
    console.log(pets);
      res.redirect('/pets');

    })
})





// pets.get('/pets/seed', (req, res)=> {
//   Pet.insertMany(petSeeds, (err, pets)=> { if(err) {console.log(err)} else {
//     res.send(pets)
//   }
//
//     })
//   })


//
// router.get('/seed', (req, res)=> {
//   const newPets = [
//
//     ]
//   Pet.create(newPets, (err, pet)=> {
//     if(err) {console.log(err); }
//     console.log('SEED: NEW PETS ADDED')
//     res.redirect('/pets')
//   })
//   })


module.exports = router

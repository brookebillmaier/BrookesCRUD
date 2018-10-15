const express = require('express')
const router = express.Router()
const app = express ()
const Pet = require('../models/pets.js')
const petSeeds = require('../models/seed.js')


router.get('/pets', (req, res)=> {
  Pet.find({}, (error, allPets)=> {
    res.render('index.ejs', {
      pets: allPets,
      currentUser: req.session.currentUser,
    })
  })
})


router.get('/pets/all', (req, res)=> {
  Pet.find({}, (error, allPets)=> {
    res.render('all.ejs', {
      pets: allPets,
      currentUser: req.session.currentUser,
    })
  })
})

router.get('/pets/dogs', (req, res)=> {
  Pet.find({type: "dog"}, (error, allDogs)=> {
    res.render('dogs.ejs', {
      dogs: allDogs,
      currentUser: req.session.currentUser,
    })
  })
})

router.get('/pets/cats', (req, res)=> {
  Pet.find({type: "cat"}, (error, allCats)=> {
    res.render('cats.ejs', {
      cats: allCats,
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
  Pet.findById(req.params.id, (err, pets)=> {
    res.render('show.ejs', {
      pets: pets,
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
  Pet.insertMany(petSeeds, (err, pets)=> {
    if(err) {console.log(err); } else {
      res.redirect('/pets');
      res.send(pets, {pets: pets});

    }
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

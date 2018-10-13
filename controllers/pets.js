const express = require('express')
const router = express.Router()
const app = express ()
const Pet = require('../models/pets.js')


router.get('/', (req, res)=> {
  Pet.find({}, (error, allPets)=> {
    res.render('index.ejs', {
      pets: allPets,
      currentUser: req.session.currentUser,
    })
  })
})



//
// //index: get
// router.get('/', (req, res)=> {
//   Pet.find({}, (err, pets)=> {
//     if(err){console.log(err);}
//     res.render('/index.ejs')
//   })
// })



//new: get
router.get('/new', (req, res)=> {
  res.render('new.ejs')
})



// Get - show
router.get('/:id', (req, res)=> {
  Pet.findById(req.params.id, (err, foundPet)=> {
    res.render('show.ejs', {
      pet: foundPet})
  })
})


//POST - create
// '/pets'
router.post('/', (req, res)=> {
  Pet.create(req.body, (err, pet)=> {
    if(err){res.send (err)}
    else {
      res.redirect('/pets/' + pet.id)
    }
  })
})






//Get - edit
// '/pets/:id/edit'
router.get('/:id/edit', (req, res)=> {
  Pet.findByID(req.params.id, (err, pet)=> {
    if(err) {console.log(err)}
    res.render('edit.js', {pet:pet})
  })
})


//Patch/PUT - Update
// '/pets/:id'
router.put('/:id', (req, res)=> {
  Pet.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, pet)=> { if (err) {console.log(err);}
  res.redirect('/pets/' + pet.id)
  })
})




//DELETE - Destroy
// '/photos/:id'
router.delete('/:id', (req, res)=> {
  Pet.findByIdAndRemove(req.params.id, (err, pet)=> {
    if(err){console.log(err)}
    res.redirect('/')
  })
})


const petSeeds = require('../models/seed.js')
router.get('/seed/newpets', (req, res)=> {
  Pet.insertMany(petSeeds, (err, pets)=> {
    if(err) {console.log(err); } else {
      res.send(pets)
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
router.get('/seed/newpets', (req, res)=> {
  const newPets = [
      {
    _id: "58e913abb7304c0e0f20d0d8",
    name: "Beans",
    about: "A small pile of beans. Buy more beans for a big pile of beans.",
    img: "http://www.rodalesorganiclife.com/sites/rodalesorganiclife.com/files/styles/slideshow-desktop/public/navybeans_peangdao_1100.jpg?itok=QB7fl971",
    missing: "september"
    },
    ]
  Pet.create(newPets, (err, pet)=> {
    if(err) {console.log(err); }
    console.log('SEED: NEW PETS ADDED')
    res.redirect('/pets')
  })
  })


module.exports = router

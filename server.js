const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path')

const placesRoutes = express.Router()



let Places = require('./places.model')

app.use(cors());
app.use(bodyParser.json());


// Local database
// mongoose.connect ('mongodb://localhost:27017/whereToEat', {useNewUrlParser: true})
// const connection = mongoose.connection
// connection.once('open', function () {
//   console.log('MongoDB database connection established successfully.')
// })

// DB Config mLab
const db = require('./config/keys').mongoURI
mongoose
  .connect (db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))



// List all places
placesRoutes.route('/').get(function(req, res) {
  Places.find(function(err, places) {
    if(err){
      console.log(err)
    } else {
      res.json(places)
    }
  })
})

// Pick Random Place
placesRoutes.route('/random').get(function(req, res) {
  Places.aggregate(
    [ { $sample: { size: 1 } } ]
 )
 .then(randPlace => {
   res.json(randPlace)
 })
})

  

// Shows place by id
placesRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id
  Places.findById(id, function(err, places) {
    if(!places){
      res.send("Place doesn't exist!")
    } else {
      res.json(places)
    }
  })
})

// Add place
placesRoutes.route('/addEat').post(function(req, res) {
  const newPlace = {
    name: req.body.name,
    type: req.body.type,
    address: req.body.address
  }

  let places = new Places(newPlace)
  places.save()
    .then(places => {
      res.status(200).json({'places': "place added successfully"})

    }) 
    .catch(err => {
      res.status(400).send('Error in adding new place.')
    })
})

// Update existing place entry
placesRoutes.route('/update/:id').post(function(req, res) {
  Places.findById(req.params.id, function(err, places) {
    if(!places) {
      res.status(404).send('Data does not exist')
    } else {
      places.name = req.body.name,
      places.type = req.body.type,
      places.address = req.body.address
    }

    places.save()
      .then(places => {
        res.json(('Place Updated'))
    })
    .catch(err => {
      res.status(400).send('Update no possible.')
    })
  })
})

// Delete place
placesRoutes.route('/delete/:id').delete(function(req, res, next) {
  Places.deleteOne({"_id" : req.params.id})
  .then(() => {
    res.status(200).json({
      "places" : "place succesfully removed"
    })
  })
  .catch(err => {
    res.status(400).send('Server error')
  })
})

app.use('/', placesRoutes)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) // relative path
  })
}

const port = process.env.PORT || 4000


app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});
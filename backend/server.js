const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = 4000;

const placesRoutes = express.Router()

let Places = require('./places.model')

app.use(cors());
app.use(bodyParser.json());



mongoose.connect ('mongodb://localhost:27017/whereToEat', {useNewUrlParser: true})
const connection = mongoose.connection

connection.once('open', function () {
  console.log('MongoDB database connection established successfully.')
})



placesRoutes.route('/').get(function(req, res) {
  Places.find(function(err, places) {
    if(err){
      console.log(err)
    } else {
      res.json(places)
    }
  })
})

placesRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id
  Places.findById(id, function(err, places) {
    res.json(places)
  })
})

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

app.use('/places', placesRoutes)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Pets = require('./models/pets');

/* mongoose.connect('mongodb://localhost:27017/petslist', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}) */

mongoose.connect('mongodb://localhost:27017/petslist');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/petslist');
  console.log('database connection opened!!!')
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/pets', async (req, res) => {
  //get all pets from db
  const pets = await Pets.find({});
  res.render('pets/index', { pets });
})

app.get('/pets/:id', async (req, res) => {
  //find pet by id
  const pet = await Pets.findById(req.params.id);
  res.render('pets/show', {pet});
})

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
})

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Pets = require('./models/pets');

mongoose.connect('mongodb://localhost:27017/petslist', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})


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

app.get('/addpet', async(req, res) => {
    const pet = new Pets({
      name: 'Fluffy',
      petType: 'Cat',
      breed: 'Siamese',
      age: 3,
      gender: 'Female',
      isSpayedOrNeutered: true,
      location: 'San Francisco',
      description: 'Fluffy is a very friendly cat who loves to play with toys and cuddle with her human.',
    })

    await pet.save();
    res.send(pet);

})

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
})

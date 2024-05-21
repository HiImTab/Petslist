const mongoose = require('mongoose');
const Pets = require('../models/pets');
const listofpets = require('./petseed');

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

const seedDB = async () => {
    //delete all pets
    await Pets.deleteMany({});
    //add pets
    for (let i = 0; i < listofpets.length; i++) {
        const pet = new Pets({
            name: listofpets[i].name,
            petType: listofpets[i].petType,
            breed: listofpets[i].breed,
            age: listofpets[i].age,
            gender: listofpets[i].gender,
            isSpayedOrNeutered: listofpets[i].isSpayedOrNeutered,
            location: listofpets[i].location,
            description: listofpets[i].description,
        })

        await pet.save();
    }
}

//close database connection after seeding
seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database connection closed!!!')
})
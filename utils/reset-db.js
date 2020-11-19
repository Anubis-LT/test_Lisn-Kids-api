const mongoose = require("mongoose");
const faker = require("faker/locale/fr");

mongoose.connect("mongodb://localhost:27017/dvd-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// IMPORT MODELS
const Movies = require("../models/Movies");
const Users = require("../models/Users");

// EMPTY COLLECTION FUNCTION
const emptyCollection = async (name) => {
  await name.deleteMany({});
  console.log(`✅ une collection vidée.`);
};

// IMPORT DATA FUNCTION
const importDataInCollection = async (collection, data) => {
  await emptyCollection(collection);
  const arr = await collection.insertMany(data);
  console.log(`❎ ${arr.length} entrées ont été ajoutées à la collection.`);
};

(async () => {
  // IMPORTS MOVIES
  const movies = require("../data/movies");
  await importDataInCollection(Movies, movies);

  // IMPORTS USERS
  const users = [];
  for (let i = 1; i <= 20; i++) {
    // GENREATE FAKE OBJECT
    const obj = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: `https://randomuser.me/api/portraits/men/${i}.jpg`, // I DIDN'T USE FAKER.JS FOR AVATAR
      phoneNumber: faker.phone.phoneNumber(),
    };
    // PUSH IT IN THE USERS ARRAY
    users.push(obj);
  }
  await importDataInCollection(Users, users);
  await mongoose.connection.close();
})();

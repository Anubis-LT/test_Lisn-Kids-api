const mongoose = require("mongoose");
const faker = require("faker/locale/fr");
const _ = require("lodash");

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

  const listOfMovies = await Movies.find();
  const listOfMoviesIds = listOfMovies.map((movie) => movie._id);

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
    // RANDOMIZE A NUMBER OF MOVIES FOR THIS USER
    const numberOfMovies = Math.floor(Math.random() * movies.length);
    // CREATE OF COPY OF MOVIES IDS ARRAY AND SHUFFLE IT
    const userMovies = _.shuffle(listOfMoviesIds).slice(0, numberOfMovies - 1);
    // ADD MOVIES IDS TO FAKE OBJET
    obj.movies = userMovies;
    // PUSH IT IN THE USERS ARRAY
    users.push(obj);
  }
  await importDataInCollection(Users, users);
  await mongoose.connection.close();
})();

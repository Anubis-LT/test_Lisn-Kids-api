const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");

const mongoose = require("mongoose");

// IMPORT MODELS
const Movies = require("./models/Movies");

const movies = require("./data/movies");

mongoose.connect(
  process.env.NODE_ENV === production
    ? process.env.DATABASE_URL
    : "mongodb://localhost:27017/dvd-shop",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const app = new express();

app.use(formidableMiddleware());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Welcome to dvd-shop API");
});

app.listen(3000, () => {
  console.log("Server started!");
});

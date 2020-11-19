const mongoose = require("mongoose");

const schema = {
  title: String,
  year: String,
  runtime: String,
  genre: String,
  director: String,
  writer: String,
  actors: String,
  plot: String,
  language: String,
  country: String,
  poster: String,
  imdbRating: Number,
  type: String,
  totalSeasons: Number,
  images: [String],
};

module.exports = mongoose.model("Movies", schema, "movies");

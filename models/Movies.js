const mongoose = require("mongoose");

const schema = {
  rank: Number,
  title: String,
  fullTitle: String,
  year: String,
  image: String,
  crew: String,
  imDbRating: Number,
};

module.exports = mongoose.model("Movies", schema, "movies");

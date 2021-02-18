const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  phoneNumber: String,
  isBanned: {
    type: Boolean,
    default: false,
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movies" }],
});

module.exports = mongoose.model("Users", schema, "users");

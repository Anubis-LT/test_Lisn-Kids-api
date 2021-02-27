const mongoose = require("mongoose");

const schema = mongoose.Schema({
   email: { type: String, unique: true },

   Account: {
      firstName: String,
      lastName: String,
      avatar: Object,
      adress1: String,
      adress2: String,
      zipcode: String,
      city: String,
      country: String,
      birthday: String,
      phoneNumber: String,
      languageDefault: String,
      secretcode: Number,
   },
   admin: {
      type: Boolean,
      default: false,
   },

   isActif: {
      type: Boolean,
      default: false,
   },
   children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Children" }],
   subscriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subscriptions" },
   ],
   Paiements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paiements" }],

   createdAt: Date,
   updatedAt: { type: Date, default: Date.now },
   token: String,
   hash: String,
   salt: String,
});

module.exports = mongoose.model("Users", schema, "users");

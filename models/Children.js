const mongoose = require("mongoose");

const schema = mongoose.Schema({
   firstName: String,
   avatar: String,
   age: Number,
   isActif: {
      type: Boolean,
      default: true,
   },
   createdAt: Date,
   updatedAt: { type: Date, default: Date.now },
   Episode: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],
});

module.exports = mongoose.model("Children", schema, "children");

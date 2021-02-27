const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();

app.use(formidable());
app.use(cors());

require("dotenv").config();

// IMPORT MODELS
const Series = require("./models/Series");
const Episodes = require("./models/Episodes");

// for test
//const series = require("./data/series");
//const episodes = require("./data/episodes");

mongoose.connect(
   process.env.NODE_ENV === "PRODUCTION"
      ? process.env.DATABASE_URL
      : "mongodb://localhost:27017/lisnkids",
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }
);

// routes default
app.get("/", function (req, res) {
   res.send("Welcome to the Lisn Kids API.");
});

// routes connection users sigin signup
const usersRoutes = require("./routes/users.js");
app.use(usersRoutes);

// routes crud children
// routes crud Series
// routes crud episodes
// routes crud subscriptions
// routes crud paiements

// Others routes
app.all("*", function (req, res) {
   res.status(404).json({ error: "Not Found" });
});

// Launch Server
app.listen(process.env.PORT, () => {
   console.log("Lisn Kids API running");
});

const express = require("express");
const router = express.Router();

// uid2 et crypto-js crypt password
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Import model User and Children
const User = require("../models/Users");
const Children = require("../models/Children");

// Route signup
router.post("/user/signup", async (req, res) => {
   try {
      // Search in the BDD.  Does a user have this email address ?
      const user = await User.findOne({ email: req.fields.email });

      // If ok, return a message and do not proceed with registration
      if (user) {
         res.status(409).json({ message: "This email already has an account" });
      } else {
         // required information ?
         if (
            req.fields.email &&
            req.fields.password &&
            req.fields.firstName &&
            req.fields.lastName
         ) {
            const token = uid2(64);
            const salt = uid2(64);
            const hash = SHA256(req.fields.password + salt).toString(encBase64);

            // create new user
            const newUser = new User({
               email: req.fields.email,
               token: token,
               hash: hash,
               salt: salt,
               account: {
                  firstName: req.fields.firstName,
                  lastName: req.fields.lastName,
                  avatar: req.fields.avatar,
                  adress1: req.fields.adress1,
                  adress2: req.fields.adress2,
                  zipcode: req.fields.zipcode,
                  city: req.fields.city,
                  country: req.fields.country,
                  birthday: req.fields.birthday,
                  phoneNumber: req.fields.phoneNumber,
                  languageDefault: req.fields.languageDefault,
                  secretcode: req.fields.secretcode,
               },
               isActif: true,
               createdAt: Date.now,
            });

            //  save this new user in the
            await newUser.save();
            res.status(200).json({
               _id: newUser._id,
               email: newUser.email,
               token: newUser.token,
               account: newUser.account,
            });
         } else {
            // user not sent the required information? ?
            res.status(400).json({ message: "Missing parameters" });
         }
      }
   } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
   }
});

router.post("/user/login", async (req, res) => {
   try {
      const user = await User.findOne({ email: req.fields.email });

      if (user) {
         if (
            SHA256(req.fields.password + user.salt).toString(encBase64) ===
            user.hash
         ) {
            res.status(200).json({
               _id: user._id,
               token: user.token,
               account: user.account,
            });
         } else {
            res.status(401).json({ error: "Unauthorized" });
         }
      } else {
         res.status(400).json({ message: "User not found" });
      }
   } catch (error) {
      console.log(error.message);
      res.json({ message: error.message });
   }
});

module.exports = router;

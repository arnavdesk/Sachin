"use strict";
const mongoose = require("mongoose");
const { mongoURI } = require("../config/keys");

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(()=>{console.log("MongoDB connected")})
.catch((error)=>{console.log(error)});

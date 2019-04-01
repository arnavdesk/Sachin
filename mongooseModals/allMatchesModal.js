"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose; 

let MatchSchema = new Schema({
  battingScore: Number,
  isNotOut: Boolean,
  wickets: Number,
  runsConceded: Number,
  catches: Number,
  opposition: String,
  ground: String,
  date: String,
  matchResult: String,
  resultMargin: Number,
  toss: String,
  battingInnigs: String
});

module.exports = { MatchSchema };
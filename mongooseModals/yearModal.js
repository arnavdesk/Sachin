let mongoose = require("mongoose");
let { Schema } = mongoose;

let YearSchema = new Schema({
  wasNotOut: Number,
  hightestScore: Number,
  year: Number,
  totalRuns: Number,
  numOfDoubleCenturies: Number,
  numOfCenturies: Number,
  numOfHalfCenturies: Number,
  numOfInnings: Number,
  scoredMoreThanHundradAndTeamWon: Number,
  scoredHalfCenturyAndTeamWon: Number,
  numOfGamesWon: Number,
  numOfGamesLost: Number,
  totalNumOfMatchesPlayed: Number,
  successFullRunChase: Number,
  scoredLessThenTwentyAndTeamLost: Number
});

let YearsModal = mongoose.model("years", YearSchema);
module.exports = { YearsModal };
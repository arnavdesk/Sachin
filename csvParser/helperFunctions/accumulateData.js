function accumulateData(obj, data){
  if(obj.year != data.date){
    console.log("year data is = ", obj.year);
    console.log("match is played at = ", data.date);
    throw new Error("There is a problem in the algo");
  }

  let scoredDoubleCentury = data.battingScore >= 200;
  let scoredCentury = data.battingScore < 200 && data.battingScore >= 100;
  let scoredHalfCentury = data.battingScore >= 50 && data.battingScore < 100;
  let cameToBat = data.battingScore > -1;
  let teamWon = data.matchResult === "won";
  let teamLost = data.matchResult === "lost";


  data.isNotOut && (obj.wasNotOut++);
  obj.hightestScore = data.battingScore > obj.hightestScore ? data.battingScore : obj.hightestScore;
  cameToBat && (obj.totalRuns = obj.totalRuns + data.battingScore);
  scoredDoubleCentury && (obj.numOfDoubleCenturies++);
  scoredCentury &&( obj.numOfCenturies++);
  scoredHalfCentury && (obj.numOfHalfCenturies++);
  cameToBat && (obj.numOfInnings++);
  data.battingScore >= 100 && teamWon && (obj.scoredMoreThanHundradAndTeamWon++);
  data.battingScore >= 100 && teamLost && (obj.scoredMoreThanHundradAndTeamLost++);
  scoredHalfCentury && teamWon && (obj.scoredHalfCenturyAndTeamWon++);
  teamWon && (obj.numOfGamesWon++);
  teamLost && (obj.numOfGamesLost++);
  obj.totalNumOfMatchesPlayed++;
  data.battingInnigs === "2nd" && cameToBat && teamWon && (obj.successFullRunChase++);
  cameToBat && data.battingScore <= 20 && teamLost && (obj.scoredLessThenTwentyAndTeamLost = obj.scoredLessThenTwentyAndTeamLost + 1);
}

module.exports = { accumulateData };
class Year{
  constructor(data){
    let scoredDoubleCentury = data.battingScore >= 200;
    let scoredCentury = data.battingScore < 200 && data.battingScore >= 100;
    let scoredHalfCentury = data.battingScore >= 50 && data.battingScore < 100;
    let cameToBat = data.battingScore > -1;
    let teamWon = data.matchResult === "won";
    let teamLost = data.matchResult === "lost";

    this.wasNotOut = data.isNotOut ? 1 : 0;
    this.hightestScore = cameToBat && data.battingScore;
    this.year = data.date;
    this.totalRuns = data.battingScore;
    this.numOfDoubleCenturies = scoredDoubleCentury  ? 1 : 0
    this.numOfCenturies = scoredCentury  ? 1 : 0;
    this.numOfHalfCenturies = scoredHalfCentury ? 1 : 0;
    this.numOfInnings = cameToBat ? 1 : 0; 
    this.scoredMoreThanHundradAndTeamWon = data.battingScore >= 100 && teamWon ? 1 : 0;
    this.scoredMoreThanHundradAndTeamLost = data.battingScore >= 100 && teamLost ? 1 : 0;
    this.scoredHalfCenturyAndTeamWon = scoredHalfCentury && teamWon ? 1 : 0;
    this.numOfGamesWon = teamWon ? 1 : 0;
    this.numOfGamesLost = teamLost ? 1 : 0;
    this.totalNumOfMatchesPlayed = 1;
    this.successFullRunChase = data.battingInnigs === "2nd" && cameToBat && teamWon ? 1 : 0;
    this.scoredLessThenTwentyAndTeamLost = cameToBat && data.battingScore <= 20 && teamLost ? 1 : 0;
  }
}

module.exports = { Year };
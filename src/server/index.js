require("../../mongooseSetup/mongooseSetup");
const express = require("express");
const app = express();
const { YearsModal } = require("../../mongooseModals/yearModal");
const { facts } = require("../data/facts");
const port = process.env.PORT || 8080;
const path = require("path");
const getDataBetween = (startDate, endDate) => {
  return YearsModal.find({ year: { $gte: startDate, $lte: endDate } });
};

const getData = () => {
  return YearsModal.find();
}

app.get("/api/innings/:startDate/:endDate", async (request, response) => {
  let data = await getDataBetween(parseInt(request.params.startDate), parseInt(request.params.endDate));
  let innings = data.map(eachYear => {
    return {
      year: eachYear.year,
      innings: eachYear.numOfInnings
    };
  }).sort((a, b) => {
    if(a.year < b.year){
      return -1;
    }else{
      return 1;
    }
  });
  response.json({ data: innings, len: data.length, status: 200 });
});

app.get("/api/runs/:startDate/:endDate", async (request, response) => {
  let data = await getDataBetween(parseInt(request.params.startDate),parseInt(request.params.endDate));
  let innings = data.map(eachYear => {
    return {
      year: eachYear.year,
      runs: eachYear.totalRuns
    };
  }).sort((a, b) => {
    if(a.year < b.year){
      return -1;
    }else{
      return 1;
    }
  });
  response.json({ data: innings, len: data.length, status: 200 });
});

app.get("/api/achievements/:startDate/:endDate", async (request, response) => {
  let data = await getDataBetween(parseInt(request.params.startDate), parseInt(request.params.endDate));
  let innings = data.map(eachYear => {
    return {
      year: eachYear.year,
      numOfCenturies: eachYear.numOfCenturies,
      numOfHalfCenturies: eachYear.numOfHalfCenturies
    };
  }).sort((a, b) => {
    if(a.year < b.year){
      return -1;
    }else{
      return 1;
    }
  });
  response.json({ data: innings, len: data.length, status: 200 });
});

app.get("/api/achievements", async (request, response) => {
  console.log("Requested");
  let ton = 0;
  let halfTon = 0;
  let data = await getData()
  data.forEach(eachYear => {
    ton += eachYear.numOfDoubleCenturies;
    ton += eachYear.numOfCenturies;
    halfTon += eachYear.numOfHalfCenturies;
  });
  response.json({ numOfCentury: ton, numOfHalfCentury: halfTon, status: 200 });

});

app.get("/api/importance", async (request, response) => {
  let scoredMoreThanHundradAndTeamWon = 0;
  let scoredHalfCenturyAndTeamWon = 0;
  let data = await getData();
  data.forEach(eachYear => {
    scoredMoreThanHundradAndTeamWon += eachYear.scoredMoreThanHundradAndTeamWon;
    scoredHalfCenturyAndTeamWon += eachYear.scoredHalfCenturyAndTeamWon
  });
  response.json({ scoredMoreThanHundradAndTeamWon, scoredHalfCenturyAndTeamWon, status: 200 });
});

app.get("/api/story/:storyNum", (request, response) => {
  let storyNum = request.params.storyNum;
  if(storyNum > facts.length || storyNum < 0){
    return response.status(404).send({ message: "Wrong Request" });
  }else{
    return response.json({ data: facts[storyNum - 1]});    
  }
});

app.use(express.static(path.resolve(__dirname, "../../client", "public" )));

app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../../client", "public/index.html" ));
});

app.listen(port, () => {
  console.log(`Server running on - ${port}`);
});




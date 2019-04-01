require("../../mongooseSetup/mongooseSetup");
const fs = require("fs");
const readline = require("readline");
const mongoose = require("mongoose");
const { MatchSchema } = require("../../mongooseModals/allMatchesModal");
const moment = require("moment");
let path = require("path");
const mapMonth = (() => {
  const mapMonth = {};
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  let month = 1; 
  months.forEach((eachMonth) => {
    if(month < 10){
      mapMonth[eachMonth] = "0" + month;
    }else{
      mapMonth[eachMonth] = "" + month;
    }
    month++;
  });
  return mapMonth;
})();

const getTimeStamp = (dateString) => {
  let dateComponents = dateString.toLowerCase().split(" ");

  // ISO Standard String - "Year-month-date"
  let ISOstring = `${dateComponents[2]}-${mapMonth[dateComponents[1]]}-${parseInt(dateComponents[0]) < 10 ? "0" + dateComponents[0] : dateComponents[0]}`; 
  return ISOstring;
};
const getMatchDetails = (arr) => {
  return {
    battingScore: Number.isNaN(parseInt(arr[0])) ? -1 : parseInt(arr[0]), 
    isNotOut: arr[0][arr[0].length - 1] === "*" ? true : false,
    wickets: Number.isNaN(parseInt(arr[1])) ? -1 : parseInt(arr[1]),
    runsConceded: Number.isNaN(parseInt(arr[2])) ? -1 : parseInt(arr[2]),
    catches: Number.isNaN(parseInt(arr[3])) ? -1 : parseInt(arr[3]),
    opposition: arr[5].substring(2),
    ground: arr[6],
    date: moment(getTimeStamp(arr[7])).valueOf(),
    matchResult: arr[8],
    resultMargin: Number.isNaN(parseInt(arr[9])) ? -1 : parseInt(arr[9]),
    toss: arr[10],
    battingInnigs: arr[11],
  };
}


let parseData = (fileName) => {
  return new Promise((resolve, reject) => {
    const inStream = fs.createReadStream(fileName);
    const rl = readline.createInterface(inStream);
    let allMatches = [];
    let isHeader = true;

    // reading the data line by line
    rl.on("line", (data) => {
      if(isHeader){
        isHeader = false;
        return;
      }
      let arr = data.split(",");
      allMatches.push(getMatchDetails(arr));
    });

    // resolve the promise with all the matches
    rl.on("close", () => {
      resolve(allMatches);
    });

    // if you provide the wrong path or any other error
    inStream.on("error", (error) => {
      reject(error);
    });
  });
};


// Parsing and storing all the data in MongoDB
const parseAndStoreData = async () => {
  let arr = []; 
  let allMatches = await parseData(path.resolve(__dirname, '../dataFromCSV/sachinSmall.csv'));
  let Match = mongoose.model("Match", MatchSchema);
  allMatches.forEach((eachMatch) => {
    let newMatch = new Match(eachMatch);
    arr.push(newMatch.save());
  });

  await Promise.all(arr);
  return "Data Stored";
};

parseAndStoreData()
.then((msg) => {
  console.log("[SUCCESS] - ", msg);
  mongoose.connection.close();
})
.catch((error) => {
  console.log("[ERROR] - ", error);
  mongoose.connection.close();
});



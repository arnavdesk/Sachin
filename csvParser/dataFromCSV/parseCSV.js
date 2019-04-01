const fs = require("fs");
const readline = require("readline");
const { Year } = require("../helperFunctions/CreateYear");
const { getMatchObj } = require("../helperFunctions/getMatahObj");
const { accumulateData } = require("../helperFunctions/accumulateData"); 

let parseData = (fileName) => {
  return new Promise((resolve, reject) => {
    const inStream = fs.createReadStream(fileName);
    const rl = readline.createInterface(inStream);
    let dataForEveryYear = [];
    let isHeader = true;

    // reading the data line by line
    rl.on("line", (data) => {
      if(isHeader){
        isHeader = false;
        return;
      }
      let arr = data.split(",");
      let matchData = getMatchObj(arr);
      let index = matchData.date % 1989;
      if(typeof dataForEveryYear[index] === "undefined"){
        // This is the first match for this given year 
          // create the year
        dataForEveryYear[index] = new Year(matchData);
      }else{
        accumulateData(dataForEveryYear[index], matchData);
      }
    });

    // resolve the promise with all the matches
    rl.on("close", () => {
      resolve(dataForEveryYear);
    });

    // if you provide the wrong path or any other error
    inStream.on("error", (error) => {
      reject(error);
    });
  });
};


module.exports = { parseData };


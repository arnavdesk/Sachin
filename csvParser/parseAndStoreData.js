require("../mongooseSetup/mongooseSetup");
let path = require("path");
let { parseData } = require("./dataFromCSV/parseCSV");
const { YearsModal } = require("../mongooseModals/yearModal");
const mongoose = require("mongoose");

// Parsing and storing all the data in MongoDB
const parseAndStoreData = async () => {
  let arr = [];
  let dataForEveryYear = await parseData(path.resolve(__dirname, './dataFromCSV/sachin.csv'));
  dataForEveryYear.forEach((eachYear) => {
    let newYear = new YearsModal(eachYear);
    arr.push(newYear.save());
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

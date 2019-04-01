
let path = require("path");
let { parseData } = require("./dataFromCSV/parseCSV");

// Parsing and storing all the data in MongoDB
const parseAndStoreData = async () => {
  let dataForEveryYear = await parseData(path.resolve(__dirname, './dataFromCSV/sachin.csv'));
  dataForEveryYear.forEach((eachYear) => { console.log(eachYear) });  
  return "Data Read";
};

parseAndStoreData()
.then((msg) => {
  console.log("[SUCCESS] - ", msg);
})
.catch((error) => {
  console.log("[ERROR] - ", error);
});


























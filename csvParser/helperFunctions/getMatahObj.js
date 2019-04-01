
const getMatchObj = (arr) => {
  return {
    battingScore: Number.isNaN(parseInt(arr[0])) ? -1 : parseInt(arr[0]), 
    isNotOut: arr[0][arr[0].length - 1] === "*" ? true : false,
    wickets: Number.isNaN(parseInt(arr[1])) ? -1 : parseInt(arr[1]),
    runsConceded: Number.isNaN(parseInt(arr[2])) ? -1 : parseInt(arr[2]),
    catches: Number.isNaN(parseInt(arr[3])) ? -1 : parseInt(arr[3]),
    opposition: arr[5].substring(2),
    ground: arr[6],
    date: parseInt(arr[7].split(" ")[2]),
    matchResult: arr[8],
    resultMargin: Number.isNaN(parseInt(arr[9])) ? -1 : parseInt(arr[9]),
    toss: arr[10],
    battingInnigs: arr[11],
  };
}

module.exports = { getMatchObj }





import React, { Component } from "react";
import LineChart from "../Charts/LineChart";
import Loader from "../LoadingDataAnimation";
import ErrorWhileLoading from "../ErrorWhileLoading";

export default class CenturiesEveryYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startYear: 1989,
      endYear: 1998,
      chartData: null,
      errorOnLoad: false
    };
    this.getAnotherYearData = this.getAnotherYearData.bind(this);
  }
  getAnotherYearData(event) {
    console.log("Get data is executed");
    let arr = event.target.innerText.split("-");
    let startYear = parseInt(arr[0]);
    let endYear = parseInt(arr[1]);
    if (this.state.startYear === startYear && this.state.endYear === endYear) {
      return;
    } else {
      this.setState(() => {
        return {
          startYear,
          endYear,
          chartData: null,
          errorOnLoad: false
        };
      });
    }
  }

  async fetchAndSetState(startYear, endYear) {
    try {
      let response = await fetch(`/api/achievements/${startYear}/${endYear}`)
      
      if(response.status !== 200){
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      let responseData = await response.json();
      // evaluate the response
      let years = [];
      let centuriesEachYear = [];
      let halfCenturiesEachYear = [];
      responseData.data.forEach((eachYear) => {
        years.push("" + eachYear.year);
        centuriesEachYear.push(eachYear.numOfCenturies);
        halfCenturiesEachYear.push(eachYear.numOfHalfCenturies);
      });

      this.setState((prevState) => {
        return {
          ...prevState,
          chartData: {
            years, 
            centuriesEachYear,
            halfCenturiesEachYear
          },
          errorOnLoad: false
        };
      });
    } catch (error) {
      this.setState(() => {
        return { errorOnLoad: true };
      });
      console.log("[ERROR] - " + error.message);
    }
  }

  fetchAndSetStateHelper(startYear, endYear){
    this.fetchAndSetState(startYear, endYear)
    .then(() => {})
    .catch((error) => {
      this.setState(() => {
        return { errorOnLoad: true };
      });
      console.log("[ERROR] - " + error.message);
    });
  }

  componentDidUpdate() {
    // Whenever the component is updated and the chartData is null 
    // get the new data
    console.log("componentDidUpdate started");
    if (!this.state.chartData && !this.state.errorOnLoad) {
      console.log("Getting data on component update");
      this.fetchAndSetStateHelper(this.state.startYear, this.state.endYear);
    }
    console.log("componentDidUpdate finised");
  }

  componentDidMount() {
    this.fetchAndSetStateHelper(this.state.startYear, this.state.endYear);
  }

  render() {
    console.log("This is executed - ", this.state);
    return (
      <div className="chartContainer">
        {this.state.chartData !== null ? (
          <LineChart
            years={this.state.chartData.years}
            centuriesEachYear={this.state.chartData.centuriesEachYear}
            halfCenturiesEachYear={this.state.chartData.halfCenturiesEachYear}
          />
        ) : (
          <div className="loader">
            {this.state.errorOnLoad ? (
              <ErrorWhileLoading />
            ) : (
                <Loader />
              )}
          </div>
        )}
        <div className="yearsPlayed">
          <button disabled={this.state.startYear === 1989 ? true : false} onClick={this.getAnotherYearData}>1989-1998</button>
          <button disabled={this.state.startYear === 1999 ? true : false} onClick={this.getAnotherYearData}>1999-2008</button>
          <button disabled={this.state.startYear === 2009 ? true : false} onClick={this.getAnotherYearData}>2009-2012</button>
        </div>
      </div>
    )
  }
}




























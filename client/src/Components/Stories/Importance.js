import React, { Component } from "react";
import StackedBarChart from "../Charts/StackedBarChart";
import Loader from "../LoadingDataAnimation";
import ErrorWhileLoading from "../ErrorWhileLoading";

export default class AccumulatedAchievements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      errorOnLoad: false
    };
  }

  async fetchAndSetState() {
    try {
      let response = await fetch(`/api/importance`);
      if (response.status !== 200) {
        // Throw error
        throw new Error("[ERROR] - ", error.message);
      }
      let responseData = await response.json();
      this.setState(() => {
        return {
          chartData: {
            scoredMoreThanHundradAndTeamWon: responseData.scoredMoreThanHundradAndTeamWon,
            scoredHalfCenturyAndTeamWon: responseData.scoredHalfCenturyAndTeamWon
          }
        }
      });
      return "Data Fetched And State is Set";
    } catch (error) {
      this.setState(() => {
        return { errorOnLoad: true };
      });
      console.log("[ERROR] - " + error.message);
    }
  }

  fetchAndSetStateHelper(){
    this.fetchAndSetState()
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
    if (!this.state.chartData && !this.state.errorOnLoad) {
      this.fetchAndSetStateHelper();
    }
  }

  componentDidMount() {
    this.fetchAndSetStateHelper();
  }

  render() {
    return (
      <div className="chartContainer">
        {this.state.chartData !== null ? (
          <StackedBarChart
            achievement2={this.state.chartData.scoredMoreThanHundradAndTeamWon}
            achievement1={this.state.chartData.scoredHalfCenturyAndTeamWon}
            color1='#4caf50'
            color2='#673ab7'
            text="Important Innigs"
            name1="Scored > 50 and team Won"
            name2="Scored > 100 and team Won"
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
      </div>
    )
  }
}




























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
      let response = await fetch(`/api/achievements`);
      
      if(response.status !== 200){
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      let responseData = await response.json();
      // evaluate the response
      this.setState(() => {
        return {
          chartData: {
            numOfCentury: responseData.numOfCentury,
            numOfHalfCentury: responseData.numOfHalfCentury
          }
        }
      });
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
    console.log("componentDidUpdate started");
    if (!this.state.chartData && !this.state.errorOnLoad) {
      console.log("Getting data on component update");
      this.fetchAndSetStateHelper();
    }
    console.log("componentDidUpdate finised");
  }

  componentDidMount() {
    this.fetchAndSetStateHelper();
  }

  render() {
    console.log("This is executed - ", this.state);
    return (
      <div className="chartContainer">
        {this.state.chartData !== null ? (
          <StackedBarChart 
            achievement2={this.state.chartData.numOfCentury}
            achievement1={this.state.chartData.numOfHalfCentury}
            color1='#ff5722'
            color2='#4caf50'
            text="Number of 100s and 50s"
            name1="50s"
            name2="100s"
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




























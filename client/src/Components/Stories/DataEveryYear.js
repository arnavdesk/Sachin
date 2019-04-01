import React,{ Component } from "react";
import BarChart from "../Charts/BarChart";
import Loader from "../LoadingDataAnimation";
import ErrorWhileLoading from "../ErrorWhileLoading";

export default class DataEveryYear extends Component{
  constructor(props){
    super(props);
    this.state = {
      startYear: 1989,
      endYear: 1998,
      chartData : null,
      errorOnLoad: false
    };
    this.getAnotherYearData = this.getAnotherYearData.bind(this);
  }
  getAnotherYearData(event){
    console.log("Get data is executed");
    let arr = event.target.innerText.split("-");
    let startYear = parseInt(arr[0]);
    let endYear = parseInt(arr[1]);
    if(this.state.startYear === startYear && this.state.endYear === endYear){
      return;
    }else{
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

  async fetchAndSetState(startYear, endYear){
    try{
      let response = await fetch(this.props.getURL(startYear, endYear))
      
      if(response.status !== 200){
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      
      let responseData = await response.json();
      let categories = [];
      let data = [];
      let name = this.props.getName();
      let text = this.props.getText(this.state.startYear, this.state.endYear);
      responseData.data.forEach((eachYear) => {
        categories.push("" + eachYear.year);
        data.push(eachYear[this.props.lookingFor]);
      });
      this.setState((prevState) => {
        return {
          ...prevState,
          chartData: {
            categories,
            data,
            name, 
            text
          },
          errorOnLoad: false
        };
      });

    }catch(error){
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
      console.log("[ERROR] : " + error.message);
    });
  }

  componentDidUpdate(){
    // Whenever the component is updated and the chartData is null 
     // get the new data
    console.log("componentDidUpdate started");
    if(!this.state.chartData && !this.state.errorOnLoad){
      console.log("Getting data on component update");
      this.fetchAndSetStateHelper(this.state.startYear, this.state.endYear);
    }
    console.log("componentDidUpdate finised");
  }
  
  componentDidMount(){
    this.fetchAndSetStateHelper(this.state.startYear, this.state.endYear);
  }

  render(){
    console.log("This is executed - ", this.state);
    return (
      <div className="chartContainer">
        {this.state.chartData !== null ? (
          <BarChart
            categories={this.state.chartData.categories}
            text={this.state.chartData.text}
            data={this.state.chartData.data}
            name={this.state.chartData.name}
            barColor={this.props.barColor}
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




























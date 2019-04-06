
import React, { Component, Suspense } from "react";
import DataEveryYear from "./Stories/DataEveryYear";
import { Route, Switch } from "react-router-dom";
const LazyLoadedCenturiesEveryYear = React.lazy(() => import("./Stories/CenturiesEveryYear"));
const LazyLoadedAccumulatedAchievements = React.lazy(() => import("./Stories/AccumulatedAchievements"));
const LazyLoadedImportance = React.lazy(() => import("./Stories/Importance"));
import FactsContainer from "./FactsContainer";

class Analytics extends Component{
  constructor(props){
    super(props);
  }

  makeGetURL(startURL){
    return (startYear, endYear) => {
      return `${startURL}/${startYear}/${endYear}`;
    };
  };
  makeGetName(str){
    return () => {
      return str;
    };
  }
  makeGetText(str){
    return (startYear, endYear) => {
      return `${str} ${startYear} to ${endYear}`;
    };
  }

  render(){
    return (
      <div>
        <div className="container">
          <div className="dataContainer">
            <div className="graphContainer">
              <Switch>
                <Route 
                  exact={true} 
                  path="/story/1" 
                  render={(props) => (
                    <DataEveryYear 
                      {...props}
                      getURL={this.makeGetURL("/api/innings")}
                      getName={this.makeGetName("Innings")}
                      getText={this.makeGetText("Innings from")}
                      lookingFor="innings"
                      barColor="#4caf50"
                    />
                  )}
                />
                <Route 
                  exact={true} 
                  path="/story/2" 
                  render={(props) => (
                    <div>
                      <DataEveryYear 
                        {...props}
                        getURL={this.makeGetURL("/api/runs")} 
                        getName={this.makeGetName("Runs")}
                        getText={this.makeGetText("Runs Scored From")}
                        lookingFor="runs"
                        barColor="#f44336"
                      />
                    </div>
                  )}
                />
                <Suspense
                  fallback={(
                    <div>
                      <div className="skeletonMain skeletonWithBackground">
                        
                      </div>
                    </div>
                  )}
                >
                  <Route 
                    exact={true}
                    path="/story/3"
                    component={LazyLoadedCenturiesEveryYear}
                  />
                  <Route 
                    exact={true}
                    path="/story/4"
                    component={LazyLoadedAccumulatedAchievements}
                  />
                  <Route 
                    exact={true}
                    path="/story/5"
                    component={LazyLoadedImportance}
                  />
                </Suspense>
              </Switch>
            </div>
          </div>
        </div>
    
        <div>
          <Route path="/story/:id" component={(props) => <FactsContainer {...props} />} />
        </div>
      </div>
    
    );
  }
}
export default Analytics;























import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import StartStory from "./Components/Start";
import EndStory from "./Components/EndStory";
import Analytics from "./Components/Analytics";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import NavigationButtons from "./Components/NavigationButtons";

class StoryApp extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <BrowserRouter>
        <div>
          <div className="app">
            <Header />
            <Route exact={true} path='/' component={StartStory}/>
            <Route path="/story/:id" component={Analytics}/>
            <Route path="/story/:id" component={NavigationButtons} />
            <Route path="/end" component={EndStory} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<StoryApp />, document.getElementById("app"));


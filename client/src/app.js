import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import StartStory from "./Components/Start";
import EndStory from "./Components/EndStory";
import Skeleton from "./Components/Skeleton";
let LazyLoadedAnalytics = React.lazy(() => import("./Components/Analytics.js"));
let LazyLoadedNavigationButtons = React.lazy(() => import("./Components/NavigationButtons.js"));
import Header from "./Components/Header";
import Footer from "./Components/Footer";

class StoryApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="app">
            <Header />
            <Route exact={true} path='/' component={StartStory} />
            <Suspense
              fallback={(
                <Skeleton />
              )}
            >
              <Route path="/story/:id" component={LazyLoadedAnalytics} />
              <Route path="/story/:id" component={LazyLoadedNavigationButtons} />
            </Suspense>
            <Route path="/end" component={EndStory} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<StoryApp />, document.getElementById("app"));


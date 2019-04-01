import React from "react";
import { Link } from "react-router-dom";

const StartStory = () => {
  return (
    <div className="container">
      <div className="storyContainer">
        <div className="storyImg">

        </div>
        <div className="storyInfo">
          <div className="storyInfo-details">
            <p>Hi there,</p>
            <p>Today we will see why Sachin Tendulkar is considered as the greatest cricketer of all times. Click the link down below to join me in the journey. </p>
          </div>
          <div>
            <Link to="/story/1">START</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StartStory as default };
import React from "react";
import { Link } from "react-router-dom";

const EndStory = () => {
  let strings = ["World Cup 2011 win was a tribute to Sachin Tendulkar for his contribution to Indian Cricket Team.", "Hurray! Now we know why  Sachin Tendulkar is considered as the greatest cricketer of all times.", "Congrats on the new learning.","See you again."];
  let key = 1;
  return (
    <div className="container">
      <div className="storyContainer">
        <div className="storyImgEnd storyImg">

        </div>
        <div className="storyInfo">
          <div className="storyInfo-details">
            {
              strings.map((eachStr) => {
                return <p className="endStr" key={`endStr${key++}`}>{eachStr}</p>
              })
            }
          </div>
          <div>
            <Link to="/">Go Home</Link>
            <Link to="/story/1">Start Again</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EndStory as default };


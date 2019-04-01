import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="flexHeader">
        <div>
          <h2>Sachin</h2>
          <p>The Greatest !</p>
        </div>
        <img className="cricket" src="/icons/cricket.svg" />
    </div>
    </div>
  );
};

export { Header as default };
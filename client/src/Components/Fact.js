import React from "react";

export default (props) => {
  return (
    <div className="factDescription">
      <p>{props.fact}</p>
      <img src="/icons/award.svg" />
    </div>
  );
};
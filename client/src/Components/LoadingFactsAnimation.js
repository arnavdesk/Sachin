import React from "react";

const LoadingFactsAnimation = (props) => {
  return (
    <div>
      {props.errorOnLoad ? (
        <div className="loadingFactsContainer errorOnFactsLoad">
          <p>Sorry Error Occured While Cooking Facts.</p>
          <p>Check Your Internet Connection.</p>
        </div>
      ) : (
        <div className="loadingFactsContainer">
          <div className="flexFactsContainer">
            <p>Cooking Crispy Facts Just For You</p>
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export { LoadingFactsAnimation as default };









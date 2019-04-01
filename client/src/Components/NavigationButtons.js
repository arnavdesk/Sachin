import React from "react";
import { Link } from "react-router-dom";

const NavigationButtons = (props) => {
  let at = parseInt(props.match.params.id);
  return (
    <div className="container">
      <div className="dataContainer">
        <div className="navigationButtons">
          { (at > 1) && <Link className="pushy__btn pushy__btn--sm pushy__btn--blue navToPrev" to={`/story/${at - 1}`}>Prev</Link>}
          { at === 5 && <Link className="pushy__btn pushy__btn--sm pushy__btn--red" to="/end">End</Link>}
          { at < 5 && <Link className="pushy__btn pushy__btn--sm pushy__btn--red forceEndButton" to={`/`}>Force End</Link>}
          { at < 5 && <Link className="pushy__btn pushy__btn--sm pushy__btn--green navToNext" to={`/story/${at + 1}`}>Next</Link>}
        </div>
      </div>
    </div>
  );
};

export { NavigationButtons as default };
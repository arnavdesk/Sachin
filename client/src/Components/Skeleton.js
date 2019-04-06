import React from "react";

const Skeleton = () => {
  return (
    <div className="container">
      <div className="skeletonMain skeletonWithBackground">
      </div>
      <div className="skeletonDetails">
        <div className="skeletonElements skeletonWithBackground">

        </div>

        <div className="skeletonElements skeletonWithBackground">

        </div>

        <div className="skeletonElements skeletonWithBackground">

        </div>
      </div>
    </div>
  );
};

export { Skeleton as default };
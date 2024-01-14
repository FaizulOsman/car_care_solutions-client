import React from "react";

const SpeedometerLoader = () => {
  return (
    <div id="speedometer-loader-wrapper">
      <div className="speedometer-loader">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="loader-circle-1">
          <div className="loader-circle-2"></div>
        </div>
        <div className="needle"></div>
        <div className="speedometer-loading">Loading</div>
      </div>
    </div>
  );
};

export default SpeedometerLoader;

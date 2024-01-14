import React from "react";

const BoxLoader = () => {
  return (
    <div className="py-20">
      <div className="box-loader mx-auto">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="box">
            {[...Array(4)].map((_, innerIndex) => (
              <div key={innerIndex}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxLoader;

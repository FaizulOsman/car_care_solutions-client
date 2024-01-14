import React from "react";

const PlaceholderLoader = () => {
  return (
    <main className="placeholder-loader">
      <div className="page-content">
        <div className="placeholder-content rounded-lg">
          {[...Array(11)].map((_, index) => (
            <div key={index} className="placeholder-content_item"></div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PlaceholderLoader;

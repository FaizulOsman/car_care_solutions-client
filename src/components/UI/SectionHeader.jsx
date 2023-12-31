import React from "react";

const SectionHeader = ({ title, styles }) => {
  return (
    <h3
      style={{
        textShadow: "0 8px 4px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)",
      }}
      className={`font-bold hover:tracking-widest duration-300 ${styles}`}
    >
      {title}
    </h3>
  );
};

export default SectionHeader;

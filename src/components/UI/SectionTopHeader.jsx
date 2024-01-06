import React from "react";

const SectionTopHeader = ({ title, styles }) => {
  return (
    <h4
      className={`sub-title relative font-semibold hover:tracking-widest duration-300 ${styles}`}
    >
      <span className="sub-title_inner text-[16px] font-bold">{title}</span>
    </h4>
  );
};

export default SectionTopHeader;

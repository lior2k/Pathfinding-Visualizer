import React from "react";
import "./entry.css";

function Entry({ title, iconColorClass }) {
  return (
    <div className="entry">
      <div className={iconColorClass}></div>
      <span className="text">{title}</span>
    </div>
  );
}

export default Entry;

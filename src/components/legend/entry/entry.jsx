import React from "react";
import "./entry.css";

function Entry({ title, iconColorClass, imgClass, imgSrc }) {
  return (
    <div className="entry">
      {imgClass ? <img className={imgClass} src={imgSrc}></img> : <div className={iconColorClass}></div>}
      <span className="text">{title}</span>
    </div>
  );
}

export default Entry;

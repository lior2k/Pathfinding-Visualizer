import React from "react";
import "./Square.css";

function Square(props) {
  let className = "square";
  if (props.isBlocked) {
    className = className.concat(" blocked");
  }
  if (props.isVisited) {
    className = className.concat(" visited");
  }
  if (props.isPath) {
    className = className.concat(" path");
  }
  if (props.isStart) {
    className = className.concat(" start");
  }
  if (props.isEnd) {
    className = className.concat(" end");
  }
  return <button className={className} onMouseDown={props.onMouseDown}
    onMouseEnter={props.onMouseEnter} onMouseUp={props.onMouseUp} onMouseLeave={props.onMouseLeave}></button>;
}

export default Square;

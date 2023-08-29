import React from "react";
import "./Square.css";

function Square(props) {
  let className = `square ${
    props.isBlocked
      ? "blocked"
      : props.isVisited
      ? "visited"
      : props.isStart
      ? "start"
      : props.isEnd
      ? "end"
      : ""
  }`;
  return <button className={className} onClick={props.onClick}></button>;
}

export default Square;

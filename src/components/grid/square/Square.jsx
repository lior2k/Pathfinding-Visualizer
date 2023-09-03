import React from "react";
import "./Square.css";
import targetNodeSVG from "../../../assets/targetNode.svg";
import sourceNodeSVG from "../../../assets/sourceNode.svg";

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
  return (
    <button
      className={className}
      onMouseDown={props.onMouseDown}
      onMouseEnter={props.onMouseEnter}
      onMouseUp={props.onMouseUp}
      onMouseLeave={props.onMouseLeave}
    >
      {props.isStart ? <img className="startImg" src={sourceNodeSVG} /> // Render the <img> if isEnd is true
        :
        props.isEnd ? (
          <img className="endImg" src={targetNodeSVG} /> // Render the <img> if isEnd is true
        ) : (
          null // Render nothing if isEnd is false
        )}
    </button>
  );

}

export default Square;

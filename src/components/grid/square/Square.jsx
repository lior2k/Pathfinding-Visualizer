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
      {props.isStart ? <img className="startImg" src={sourceNodeSVG} />
        :
        props.isEnd ? (
          <img className="endImg" src={targetNodeSVG} />
        ) : (
          null
        )}
    </button>
  );

}

export default Square;

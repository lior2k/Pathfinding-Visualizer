import React from "react";
import "./legend.css";
import Entry from "./entry/entry";
import targetNodeSVG from "../../assets/targetNode.svg";
import sourceNodeSVG from "../../assets/sourceNode.svg";

function Legend() {
  return (
    <div className="legend">
      <Entry title={"Start Node"} imgClass="sourceNodeImg" imgSrc={sourceNodeSVG}></Entry>
      <Entry title={"End Node"} imgClass="targetNodeImg" imgSrc={targetNodeSVG}></Entry>
      <Entry title={"Unvisited Node"} iconColorClass={"icon white"}></Entry>
      <Entry title={"Wall Node"} iconColorClass={"icon black"}></Entry>
      <Entry title={"Visited Node"} iconColorClass={"icon gray"}></Entry>
      <Entry title={"Path Node"} iconColorClass={"icon yellow"}></Entry>
    </div>
  );
}

export default Legend;

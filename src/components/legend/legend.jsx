import React from "react";
import "./legend.css";
import Entry from "./entry/entry";

function Legend() {
  return (
    <div className="legend">
      <Entry title={"Start Node"} iconColorClass={"icon green"}></Entry>
      <Entry title={"End Node"} iconColorClass={"icon red"}></Entry>
      <Entry title={"Unvisited Node"} iconColorClass={"icon white"}></Entry>
      <Entry title={"Visited Node"} iconColorClass={"icon gray"}></Entry>
      <Entry title={"Path Node"} iconColorClass={"icon yellow"}></Entry>
    </div>
  );
}

export default Legend;

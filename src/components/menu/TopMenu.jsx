import React from "react";
import "./TopMenu.css";
import { getInitialBoard } from "../../utils/board";
import { dijkstraAlgo } from "../../algorithms/dijkstra";

function TopMenu({ board, boardFunction }) {
  return (
    <div className="top-menu">
      <button>Algorithm</button>
      <button
        onClick={() => {
          dijkstraAlgo(board, 7, 0, 7, 29);
        }}
      >
        Visualize
      </button>
      <button
        onClick={() => {
          boardFunction(getInitialBoard());
        }}
      >
        Clear Board
      </button>
    </div>
  );
}

export default TopMenu;

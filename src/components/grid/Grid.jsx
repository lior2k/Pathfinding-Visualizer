import React from "react";
import "./Grid.css";
import Square from "./square/Square";
import { useState } from "react";

function Grid({ board, updateNode }) {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  function handleClick(i, j) {
    let newNode = { ...board[i][j], isBlocked: !board[i][j].isBlocked };
    updateNode(newNode);
  }

  function handleMouseDown(i, j) {
    let newNode = { ...board[i][j], isBlocked: !board[i][j].isBlocked };
    updateNode(newNode);
    setMouseIsPressed(true);
  }

  function handleMouseEnter(i, j) {
    if (!mouseIsPressed) return;
    let newNode = { ...board[i][j], isBlocked: !board[i][j].isBlocked };
    updateNode(newNode);
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
  }

  let grid = [];
  for (let i = 0; i < board.length; i++) {
    let row = [];
    for (let j = 0; j < board[i].length; j++) {
      row.push(
        <Square
          key={i * board[i].length + j}
          onClick={() => handleClick(i, j)}
          onMouseDown={() => handleMouseDown(i, j)}
          onMouseEnter={() => handleMouseEnter(i, j)}
          onMouseUp={() => handleMouseUp(i, j)}
          isBlocked={board[i][j].isBlocked}
          isVisited={board[i][j].isVisited}
          isPath={board[i][j].isPath}
          distance={board[i][j].distance}
          isStart={board[i][j].isStart}
          isEnd={board[i][j].isEnd}
        />
      );
    }
    grid.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  return <div className="grid">{grid}</div>;
}

export default Grid;

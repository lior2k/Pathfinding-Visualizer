import React from "react";
import "./Grid.css";
import Square from "./square/Square";
import { useState } from "react";
import { startAndEndPositions } from "../../utils/board";

function Grid({ board, updateNode }) {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [movingStart, setMovingStart] = useState(false);
  const [movingEnd, setMovingEnd] = useState(false);

  function handleMouseDown(i, j) {
    let node = board[i][j];
    let newNode;
    if (node.isStart) {
      newNode = { ...node, isStart: false };
      setMovingStart(true);
    } else if (node.isEnd) {
      newNode = { ...node, isEnd: false };
      setMovingEnd(true);
    } else {
      newNode = { ...node, isBlocked: !node.isBlocked };
    }
    updateNode(newNode);
    setMouseIsPressed(true);
  }

  function handleMouseEnter(i, j) {
    if (!mouseIsPressed) return;
    if (movingStart || movingEnd) return;
    let newNode = { ...board[i][j], isBlocked: !board[i][j].isBlocked };
    updateNode(newNode);
  }

  function handleMouseUp(i, j) {
    let newNode;
    if (movingStart) {
      startAndEndPositions.startRow = i;
      startAndEndPositions.startCol = j;
      newNode = { ...board[i][j], isStart: true };
      updateNode(newNode);
      setMovingStart(false);
    } else if (movingEnd) {
      startAndEndPositions.endRow = i;
      startAndEndPositions.endCol = j;
      newNode = { ...board[i][j], isEnd: true };
      updateNode(newNode);
      setMovingEnd(false);
    }
    setMouseIsPressed(false);
  }

  let grid = [];
  for (let i = 0; i < board.length; i++) {
    let row = [];
    for (let j = 0; j < board[i].length; j++) {
      row.push(
        <Square
          key={i * board[i].length + j}
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

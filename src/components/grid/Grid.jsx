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
    let newNode;
    if (movingStart) {
      newNode = { ...board[i][j], isStart: true };
    } else if (movingEnd) {
      newNode = { ...board[i][j], isEnd: true };
    } else {
      newNode = { ...board[i][j], isBlocked: !board[i][j].isBlocked };
    }

    updateNode(newNode);
  }

  function handleMouseLeave(i, j) {
    if (!mouseIsPressed) return;
    let newNode;
    if (movingStart) {
      newNode = { ...board[i][j], isStart: false };
      updateNode(newNode);
    } else if (movingEnd) {
      newNode = { ...board[i][j], isEnd: false };
      updateNode(newNode);
    }

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

  return (
    <div className="grid">
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((node, j) => (
            <Square key={i * row.length + j}
              onMouseDown={() => handleMouseDown(i, j)}
              onMouseEnter={() => handleMouseEnter(i, j)}
              onMouseUp={() => handleMouseUp(i, j)}
              onMouseLeave={() => handleMouseLeave(i, j)}
              isBlocked={node.isBlocked}
              isVisited={node.isVisited}
              isPath={node.isPath}
              distance={node.distance}
              isStart={node.isStart}
              isEnd={node.isEnd} />
          ))}
        </div>
      ))}
    </div>
  );

}

export default Grid;

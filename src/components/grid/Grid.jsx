import React from "react";
import "./Grid.css";
import Square from "./square/Square";

function Grid({ board, onBoardClick }) {
  function handleClick(i, j) {
    let nextBoard = board.slice();
    nextBoard[i][j] = {
      ...nextBoard[i][j],
      isBlocked: !nextBoard[i][j].isBlocked,
    };
    onBoardClick(nextBoard);
  }

  let grid = [];
  for (let i = 0; i < board.length; i++) {
    let row = [];
    for (let j = 0; j < board[i].length; j++) {
      row.push(
        <Square
          key={i * 30 + j}
          onClick={() => handleClick(i, j)}
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

import React from "react";
import TopMenu from "../menu/TopMenu";
import Grid from "../grid/Grid";
import "./Home.css";
import { useState } from "react";
import { getInitialBoard } from "../../utils/board";

function Home() {
  const [board, setBoard] = useState(getInitialBoard());

  function onBoardClick(nextBoard) {
    setBoard(nextBoard);
  }

  function updateBoard(node) {
    let newBoard = board.slice();
    newBoard[node.i][node.j] = node;
    setBoard(newBoard);
  }

  return (
    <div>
      <TopMenu
        board={board}
        resetBoard={onBoardClick}
        updateBoard={updateBoard}
      />
      <Grid board={board} onBoardClick={onBoardClick} />
    </div>
  );
}

export default Home;

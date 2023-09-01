import React from "react";
import TopMenu from "../menu/TopMenu";
import Legend from "../legend/legend";
import Grid from "../grid/Grid";
import "./Home.css";
import { useState } from "react";
import { getInitialBoard } from "../../utils/board";

function Home() {
  const [board, setBoard] = useState(getInitialBoard());

  function updateBoard(nextBoard) {
    setBoard(nextBoard);
  }

  function updateNode(node) {
    let newBoard = board.slice();
    newBoard[node.i][node.j] = node;
    setBoard(newBoard);
  }

  return (
    <div>
      <TopMenu
        board={board}
        updateNode={updateNode}
        updateBoard={updateBoard}
      />
      <Legend />
      <Grid board={board} updateNode={updateNode} />
    </div>
  );
}

export default Home;

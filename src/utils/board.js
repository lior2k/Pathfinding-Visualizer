export let boardBoundaries = {
  rows: 15,
  cols: 30,
};

export let startAndEndPositions = {
  startRow: 7,
  startCol: 3,
  endRow: 7,
  endCol: 26,
};

export function getInitialBoard() {
  let initialBoard = [];
  for (let i = 0; i < boardBoundaries.rows; i++) {
    let row = [];
    for (let j = 0; j < boardBoundaries.cols; j++) {
      let node = {
        i,
        j,
        isBlocked: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        isStart: false,
        isEnd: false,
      };
      row.push(node);
    }
    initialBoard.push(row);
  }

  initialBoard[startAndEndPositions.startRow][
    startAndEndPositions.startCol
  ].isStart = true;
  initialBoard[startAndEndPositions.endRow][
    startAndEndPositions.endCol
  ].isEnd = true;

  return initialBoard;
}

export function clearPathAndVisited(board, updateNode) {
  for (const arr of board) {
    for (const node of arr) {
      let newNode = { ...node, isVisited: false, isPath: false };
      updateNode(newNode);
    }
  }
}

export function clearWalls(board, updateNode) {
  for (const arr of board) {
    for (const node of arr) {
      const newNode = { ...node, isBlocked: false };
      updateNode(newNode);
    }
  }
}

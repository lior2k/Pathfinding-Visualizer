export let boardBoundaries = {
  rows: 25,
  cols: 50,
};

export let startAndEndPositions = {
  startRow: 12,
  startCol: 10,
  endRow: 12,
  endCol: 39,
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

export function deepCopyBoard(board) {
  let newBoard = [];
  for (const arr of board) {
    let newRow = [];
    for (const node of arr) {
      let newNode = { ...node };
      newRow.push(newNode);
    }
    newBoard.push(newRow);
  }
  return newBoard;
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

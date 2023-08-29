export function getInitialBoard() {
  const numRows = 15;
  const numCols = 30;

  let initialBoard = Array(numRows)
    .fill()
    .map(() =>
      Array(numCols)
        .fill()
        .map(() => ({
          isBlocked: false,
          isVisited: false,
          distance: 0,
          isStart: false,
          isEnd: false,
        }))
    );

  initialBoard[7][0].isStart = true;
  initialBoard[7][29].isEnd = true;

  return initialBoard;
}

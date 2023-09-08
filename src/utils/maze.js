import { animateVisited } from "./animations";
import { boardBoundaries, startAndEndPositions } from "./board";

const walls = [];

function initOuterWalls(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (i === 0 || j === 0 || i === board.length - 1 || j === board[i].length - 1) {
                let newNode = { ...board[i][j], isBlocked: true };
                walls.push(newNode);
                board[i][j].isBlocked = true;
            }
        }
    }
}

function verticalDivision(board, lowRow, highRow, divisionCol) {
    // mark the whole col from lowRow to lowRow
    for (let i = lowRow + 1; i < highRow; i++) {
        let newNode = { ...board[i][divisionCol], isBlocked: true };
        walls.push(newNode);
        board[i][divisionCol].isBlocked = true;
    }
    // if the chosen col contained the start node -> unmark him
    if (divisionCol === startAndEndPositions.startCol) {
        let newNode = { ...board[startAndEndPositions.startRow][divisionCol], isBlocked: false };
        walls.push(newNode);
        board[startAndEndPositions.startRow][divisionCol].isBlocked = false;
    }
    // if the chosen col contained the end node -> unmark him
    if (divisionCol === startAndEndPositions.endCol) {
        let newNode = { ...board[startAndEndPositions.endRow][divisionCol], isBlocked: false };
        walls.push(newNode);
        board[startAndEndPositions.endRow][divisionCol].isBlocked = false;
    }
    // choose index to place a hole while making sure its not at the start or end node positions
    let holeIndex = Math.floor(Math.random() * (highRow - lowRow - 1)) + lowRow + 1;
    while ((divisionCol === startAndEndPositions.startRow && holeIndex === startAndEndPositions.startCol)
        || (divisionCol === startAndEndPositions.endRow && holeIndex === startAndEndPositions.endCol)) {
        holeIndex = Math.floor(Math.random() * (highRow - lowRow - 1)) + lowRow + 1;
    }
    // unmark hole
    let holeNode = { ...board[holeIndex][divisionCol], isBlocked: false };
    walls.push(holeNode);
    board[holeIndex][divisionCol].isBlocked = false;
}

function horizontalDivision(board, lowCol, highCol, divisionRow) {
    // mark the whole row from lowCol + 1 to highCol - 1
    for (let i = lowCol + 1; i < highCol; i++) {
        let newNode = { ...board[divisionRow][i], isBlocked: true };
        walls.push(newNode);
        board[divisionRow][i].isBlocked = true;
    }
    // if the chosen row contained the start node -> unmark him
    if (divisionRow === startAndEndPositions.startRow) {
        let newNode = { ...board[divisionRow][startAndEndPositions.startCol], isBlocked: false };
        walls.push(newNode);
        board[divisionRow][startAndEndPositions.startCol].isBlocked = false;
    }
    // if the chosen row contained the end node -> unmark him
    if (divisionRow === startAndEndPositions.endRow) {
        let newNode = { ...board[divisionRow][startAndEndPositions.endCol], isBlocked: false };
        walls.push(newNode);
        board[divisionRow][startAndEndPositions.endCol].isBlocked = false;
    }
    // choose index to place a hole while making sure its not at the start or end node positions
    let holeIndex = Math.floor(Math.random() * (highCol - lowCol - 1)) + lowCol + 1;
    while ((divisionRow === startAndEndPositions.startRow && holeIndex === startAndEndPositions.startCol)
        || (divisionRow === startAndEndPositions.endRow && holeIndex === startAndEndPositions.endCol)) {
        holeIndex = Math.floor(Math.random() * (highCol - lowCol - 1)) + lowCol + 1;
    }
    // unmark hole
    let holeNode = { ...board[divisionRow][holeIndex], isBlocked: false };
    walls.push(holeNode);
    board[divisionRow][holeIndex].isBlocked = false;
}

function recursiveDivision(board, lowRow, highRow, lowCol, highCol) {
    if (highRow - lowRow <= 3 || highCol - lowCol <= 3) return;
    if (highRow - lowRow > highCol - lowCol) {
        let possibleRows = [];
        for (let row = lowRow + 2; row < highRow - 1; row++) {
            if (board[row][lowCol].isBlocked && board[row][highCol].isBlocked) {
                possibleRows.push(row);
            }
        }
        if (possibleRows.length === 0) return;
        let divisionRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
        horizontalDivision(board, lowCol, highCol, divisionRow);
        recursiveDivision(board, lowRow, divisionRow, lowCol, highCol);
        recursiveDivision(board, divisionRow, highRow, lowCol, highCol);
    } else {
        let possibleCols = [];
        for (let col = lowCol + 2; col < highCol - 1; col++) {
            if (board[lowRow][col].isBlocked && board[highRow][col].isBlocked) {
                possibleCols.push(col);
            }
        }
        if (possibleCols.length === 0) return;
        let divisionCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];
        verticalDivision(board, lowRow, highRow, divisionCol);
        recursiveDivision(board, lowRow, highRow, lowCol, divisionCol);
        recursiveDivision(board, lowRow, highRow, divisionCol, highCol);
    }
}

export function createRecursiveMaze(board, updateNode) {
    walls.length = 0;
    initOuterWalls(board);
    recursiveDivision(board, 0, boardBoundaries.rows - 1, 0, boardBoundaries.cols - 1);
    animateVisited(walls, updateNode, 10);
}
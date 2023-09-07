import { boardBoundaries, startAndEndPositions } from "./board";

function initOuterWalls(board, updateNode) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (i === 0 || j === 0 || i === board.length - 1 || j === board[i].length - 1) {
                let newNode = { ...board[i][j], isBlocked: true };
                updateNode(newNode);
            }
        }
    }
}

function verticalDivision(board, updateNode, lowRow, highRow, divisionCol) {
    // mark the whole col from lowRow to lowRow
    for (let i = lowRow + 1; i < highRow; i++) {
        let newNode = { ...board[i][divisionCol], isBlocked: true };
        updateNode(newNode);
    }
    // if the cell above of the chosen col is a hole, unmark the node below him to keep open passage
    if (lowRow != 0) {
        if (!board[lowRow][divisionCol].isBlocked) {
            let newNode = { ...board[lowRow + 1][divisionCol], isBlocked: false };
            updateNode(newNode);
        }
    }
    // if the cell below of the chosen col is a hole, unmark the node above him to keep open passage
    if (highRow != boardBoundaries.rows - 1) {
        if (!board[highRow][divisionCol].isBlocked) {
            let newNode = { ...board[highRow - 1][divisionCol], isBlocked: false };
            updateNode(newNode);
        }
    }
    // if the chosen col contained the start node -> unmark him
    if (divisionCol === startAndEndPositions.startCol) {
        let newNode = { ...board[startAndEndPositions.startRow][divisionCol], isBlocked: false };
        updateNode(newNode);
    }
    // if the chosen col contained the end node -> unmark him
    if (divisionCol === startAndEndPositions.endCol) {
        let newNode = { ...board[startAndEndPositions.endRow][divisionCol], isBlocked: false };
        updateNode(newNode);
    }
    // choose index to place a hole while making sure its not at the start or end node positions
    let holeIndex = Math.floor(Math.random() * (highRow - lowRow - 1)) + lowRow + 1;
    while ((divisionCol === startAndEndPositions.startRow && holeIndex === startAndEndPositions.startCol)
        || (divisionCol === startAndEndPositions.endRow && holeIndex === startAndEndPositions.endCol)) {
        holeIndex = Math.floor(Math.random() * (highRow - lowRow - 1)) + lowRow + 1;
    }
    // unmark hole
    let holeNode = { ...board[holeIndex][divisionCol], isBlocked: false };
    updateNode(holeNode);
}

function horizontalDivision(board, updateNode, lowCol, highCol, divisionRow) {
    // mark the whole row from lowCol + 1 to highCol - 1
    for (let i = lowCol + 1; i < highCol; i++) {
        let newNode = { ...board[divisionRow][i], isBlocked: true };
        updateNode(newNode);
    }
    // if the cell to the left of the chosen row is a hole, unmark the node next to him to keep open passage
    if (lowCol != 0) {
        if (!board[divisionRow][lowCol].isBlocked) {
            let newNode = { ...board[divisionRow][lowCol + 1], isBlocked: false };
            updateNode(newNode);
        }
    }
    // if the cell to the right of the chosen row is a hole, unmark the node next to him to keep open passage
    if (highCol != boardBoundaries.cols - 1) {
        if (!board[divisionRow][highCol].isBlocked) {
            let newNode = { ...board[divisionRow][highCol - 1], isBlocked: false };
            updateNode(newNode);
        }
    }
    // if the chosen row contained the start node -> unmark him
    if (divisionRow === startAndEndPositions.startRow) {
        let newNode = { ...board[divisionRow][startAndEndPositions.startCol], isBlocked: false };
        updateNode(newNode);
    }
    // if the chosen row contained the end node -> unmark him
    if (divisionRow === startAndEndPositions.endRow) {
        let newNode = { ...board[divisionRow][startAndEndPositions.endCol], isBlocked: false };
        updateNode(newNode);
    }
    // choose index to place a hole while making sure its not at the start or end node positions
    let holeIndex = Math.floor(Math.random() * (highCol - lowCol - 1)) + lowCol + 1;
    while ((divisionRow === startAndEndPositions.startRow && holeIndex === startAndEndPositions.startCol)
        || (divisionRow === startAndEndPositions.endRow && holeIndex === startAndEndPositions.endCol)) {
        holeIndex = Math.floor(Math.random() * (highCol - lowCol - 1)) + lowCol + 1;
    }
    // unmark hole
    let holeNode = { ...board[divisionRow][holeIndex], isBlocked: false };
    updateNode(holeNode);
}

function recursiveDivision(board, updateNode, lowRow, highRow, lowCol, highCol) {
    if (highRow - lowRow <= 3 && highCol - lowCol <= 3) return;
    let divisionDirection;
    if (highRow - lowRow <= 3) {
        divisionDirection = 'Vertical';
    } else if (highCol - lowCol <= 3) {
        divisionDirection = 'Horizontal';
    } else {
        divisionDirection = Math.random() < 0.5 ? 'Horizontal' : 'Vertical';
    }

    if (divisionDirection === 'Horizontal') {
        let diff = highRow - lowRow - 3;
        let divisionRow = Math.floor(Math.random() * diff) + lowRow + 2;
        horizontalDivision(board, updateNode, lowCol, highCol, divisionRow);
        recursiveDivision(board, updateNode, lowRow, divisionRow, lowCol, highCol);
        recursiveDivision(board, updateNode, divisionRow, highRow, lowCol, highCol);
    } else {
        let diff = highCol - lowCol - 3;
        let divisionCol = Math.floor(Math.random() * diff) + lowCol + 2;
        verticalDivision(board, updateNode, lowRow, highRow, divisionCol);
        recursiveDivision(board, updateNode, lowRow, highRow, lowCol, divisionCol);
        recursiveDivision(board, updateNode, lowRow, highRow, divisionCol, highCol);
    }


}

export function createRecursiveMaze(board, updateNode) {
    initOuterWalls(board, updateNode);
    recursiveDivision(board, updateNode, 0, boardBoundaries.rows - 1, 0, boardBoundaries.cols - 1, null, -1);
}
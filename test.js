

function cb1(board) {
    console.log(board);
    let visited = [1, 2, 3];
    return visited;
}

function cb2(board) {
    console.log(board);
    let visited = [3, 2, 1];
    return visited;
}

function visualize(selectedAlgo) {
    let visited = selectedAlgo({ board: "board" });
    console.log(visited);
}

function mainf() {
    let selected = cb1;
    visualize(selected);
}

mainf();
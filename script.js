const cells = document.querySelectorAll(".box");
const instruction = document.getElementById("turn");
const resetBtn = document.getElementById("resetBtn");
let options = ["", "", "", "", "", "", "", "", ""]
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let player = "X";
let playing = false;

startGame()
function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    resetBtn.addEventListener("click", resetGame);
    instruction.textContent = `${player}'s turn`
    playing = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("index");
    if (options[cellIndex] != "" || !playing) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, cellIndex) {
    options[cellIndex] = player;
    cell.textContent = player;
}

function changePlayer() {
    player = (player == "X") ? "O" : "X";
    instruction.textContent = `${player}'s turn`
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const temp = winConditions[i];
        const cellA = options[temp[0]];
        const cellB = options[temp[1]];
        const cellC = options[temp[2]];
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        instruction.textContent = `${player} Won`;
        playing = false
    }
    else if (!options.includes("")) {
        instruction.textContent = 'Draw!';
        playing = false
    }
    else {
        changePlayer()
    }
}


function resetGame() {
    player = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    instruction.textContent = `${player}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    playing = true;
}
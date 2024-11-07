const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
const aiToggleBtn = document.getElementById('ai-toggle');
let gameBoard = Array(9).fill('');
let currentPlayer = 'X';
let isGameOver = false;
let playAgainstAI = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event listener for cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Handle cell clicks
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (gameBoard[index] !== '' || isGameOver) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWin();

    if (!isGameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
        if (playAgainstAI && currentPlayer === 'O') {
            makeAIMove();
        }
    }
}

// AI makes a move (simple random choice for now)
function makeAIMove() {
    let emptyCells = gameBoard.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameBoard[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        checkWin();

        currentPlayer = 'X';
    }
}

// Check for a win or draw
function checkWin() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            endGame(gameBoard[a]);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        endGame('Draw');
    }
}

// End the game
function endGame(winner) {
    isGameOver = true;
    setTimeout(() => {
        if (winner === 'Draw') {
            alert('It\'s a draw!');
        } else {
            alert(`Player ${winner} wins!`);
        }
    }, 100);
}

// Reset the game
resetBtn.addEventListener('click', () => {
    gameBoard.fill('');
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameOver = false;
});

// Toggle AI mode
aiToggleBtn.addEventListener('click', () => {
    playAgainstAI = !playAgainstAI;
    aiToggleBtn.textContent = playAgainstAI ? 'Play Against Human' : 'Play Against AI';
    resetBtn.click(); // Reset the game when toggling AI mode
});
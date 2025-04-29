document.addEventListener('DOMContentLoaded', function() {
    // Call initBoard function to initialize the chessboard
    initBoard();
    
    // Add event listener to the "Load FEN" button
    document.getElementById('loadFenButton').addEventListener('click', function() {
        const fenString = document.getElementById('fenInput').value;
        if (isValidFen(fenString)) {
            loadFen(fenString); // Function to parse and load the FEN string
        } else {
            alert('Invalid FEN string');
        }
    });
    
    // Function to toggle between dark and light modes
    function toggleMode() {
        document.body.classList.toggle('darkmode');
    }
});


function isValidFen(fen) {
    const fenPositionPattern = /^([rnbqkpRNBQKP1-8]{1,8}\/){7}[rnbqkpRNBQKP1-8]{1,8}$/;
    return fenPositionPattern.test(fen);
}

function initBoard() {
    const chessBoard = document.querySelector('.board');
    if (!chessBoard) {
        console.error("Chess board container not found.");
        return;
    }
    
    chessBoard.innerHTML = ''; // Clear any existing content

    // Create 8x8 grid for chessboard
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            // Alternate the colors of the squares
            if ((row + col) % 2 === 0) {
                square.classList.add('green');
            } else {
                square.classList.add('beige');
            }
            // Append the square to the board
            chessBoard.appendChild(square);
        }
    }
}

function toggleMode() {
    var button = document.getElementById('darkButton');
    if (button.innerText === '☀') {
        button.innerText = '☾';
        document.body.classList.add('darkmode'); // Add dark mode class
        document.body.classList.remove('lightmode'); // Remove light mode class
    } else {
        button.innerText = '☀';
        document.body.classList.remove('darkmode'); // Remove dark mode class
        document.body.classList.add('lightmode'); // Add light mode class
    }
}

document.getElementById('loadFenButton').addEventListener('click', function() {
    const fenString = document.getElementById('fenInput').value;
    if (isValidFen(fenString)) {
        loadFen(fenString);  // A function to parse and load the FEN into your board
    } else {
        alert('Invalid FEN string');
    }
});

function loadFen(fen) {
    const chessBoard = document.querySelector('.board');
    if (!chessBoard) {
        console.error("Element with class 'board' not found in the document.");
        return;
    }

    chessBoard.innerHTML = "";  // Clear the existing board

    const fenParts = fen.split(' ');
    const position = fenParts[0];
    const rows = position.split('/');

    for (let row = 0; row < 8; row++) {
        const rowString = rows[row];
        let colIndex = 0;

        for (let col = 0; col < 8; col++) {
            let cell = document.createElement('div');
            const piece = rowString[colIndex];

            cell.classList.add('piece');  // Ensure the piece class is added

            if (parseInt(piece)) {
                // Empty squares are represented by numbers in the FEN string
                colIndex += parseInt(piece);
                cell.classList.add('empty');  // Create an empty cell instead of skipping
            } else {
                // Assign the correct piece class
                switch(piece) {
                    case 'r': cell.classList.add('black-rook'); break;
                    case 'n': cell.classList.add('black-knight'); break;
                    case 'b': cell.classList.add('black-bishop'); break;
                    case 'q': cell.classList.add('black-queen'); break;
                    case 'k': cell.classList.add('black-king'); break;
                    case 'p': cell.classList.add('black-pawn'); break;
                    case 'R': cell.classList.add('white-rook'); break;
                    case 'N': cell.classList.add('white-knight'); break;
                    case 'B': cell.classList.add('white-bishop'); break;
                    case 'Q': cell.classList.add('white-queen'); break;
                    case 'K': cell.classList.add('white-king'); break;
                    case 'P': cell.classList.add('white-pawn'); break;
                }
            }

            // Add alternating colors for squares
            if ((row + col) % 2 === 0) {
                cell.classList.add('green');
            } else {
                cell.classList.add('beige');
            }

            chessBoard.appendChild(cell);
            colIndex++;
        }
    }
}




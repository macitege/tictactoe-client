// Array  taht represents cells on the game board
const cells = ['', '', '', '', '', '', '', '', '']
// Variable that holds last players info, so that engine can check who was the last player
let lastPlayer = null
// Function that allows user to make move
const makeMove = function (event) {
  // Played cell's ID
  const id = event.target.id
  // Condition to check if the box is empty and who wast the last player?
  if (cells[id] !== '') {
    alert('play on another cell')
  } else if (lastPlayer === 'o' || lastPlayer === null) {
    cells[id] = 'x'
    lastPlayer = 'x'
    $('#' + id).text('x')
  } else {
    cells[id] = 'o'
    lastPlayer = 'o'
    $('#' + id).text('o')
  }
  isOver()
}

// Function to check if the game is over?
const isOver = function () {
  if (!cells.includes('')) {
    alert('game is over')
  }
}

module.exports = {
  makeMove
}

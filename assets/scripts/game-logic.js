// Array  taht represents cells on the game board
let cells = ['', '', '', '', '', '', '', '', '']
// Variable that holds last players info, so that engine can check who was the last player
let lastPlayer = null

// For setting or resetting the game board
const setGame = function () {
  cells = ['', '', '', '', '', '', '', '', '']
  lastPlayer = null
  $('.game-board').html(`
    <div class="row">
      <div id="0" class="box"></div>
      <div id="1" class="box"></div>
      <div id="2" class="box"></div>
    </div>
    <div class="row">
      <div id="3" class="box"></div>
      <div id="4" class="box"></div>
      <div id="5" class="box"></div>
    </div>
    <div class="row">
      <div id="6" class="box"></div>
      <div id="7" class="box"></div>
      <div id="8" class="box"></div>
    </div>
    `)
  $('.box').on('click', makeMove)
  $('#message').text('')

}

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
  whoWon()
  isOver()
}

// Function to check if the game is over?
const isOver = function () {
  if (!cells.includes('')) {
    alert('game is over')
  }
}

const whoWon = function () {
  const isSame = (acc, curr) => acc + curr

  const winnerTracks = {
    track0: [cells[0], cells[1], cells[2]].reduce(isSame),
    track1: [cells[3], cells[4], cells[5]].reduce(isSame),
    track2: [cells[6], cells[7], cells[8]].reduce(isSame),
    track3: [cells[0], cells[3], cells[6]].reduce(isSame),
    track4: [cells[1], cells[4], cells[7]].reduce(isSame),
    track5: [cells[2], cells[5], cells[8]].reduce(isSame),
    track6: [cells[0], cells[4], cells[8]].reduce(isSame),
    track7: [cells[2], cells[4], cells[6]].reduce(isSame)
  }

  for (const track in winnerTracks) {
    const trackValue = winnerTracks[track]
    if (trackValue === 'xxx' || trackValue === 'ooo') {
      console.log(track + 'won')
      $('#message').text('Somebody Won!!')
    }
  }
}

module.exports = {
  makeMove,
  setGame
}

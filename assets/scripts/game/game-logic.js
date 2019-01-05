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
}

// Function to find winner
// (works during the game, when somebody wins, stops the game)
const whoWon = function () {
  // Callback function for .reduce()
  const isSame = (acc, curr) => acc + curr
  // Cell tracks that should contain x or o to create winner
  const c = cells
  const winnerTracks = {
    track0: [c[0], c[1], c[2]],
    track1: [c[3], c[4], c[5]],
    track2: [c[6], c[7], c[8]],
    track3: [c[0], c[3], c[6]],
    track4: [c[1], c[4], c[7]],
    track5: [c[2], c[5], c[8]],
    track6: [c[0], c[4], c[8]],
    track7: [c[2], c[4], c[6]]
  }
  // Loop that iterates over winnerTracks object to find a winner
  for (const track in winnerTracks) {
    // Reduces winner tracks down to a string consist of "x"s and "o"s
    const trackValue = winnerTracks[track].reduce(isSame)
    // if there is a match
    if (trackValue === 'xxx' || trackValue === 'ooo') {
      console.log(track + 'won')
      $('#message').text('Somebody Won!!')
      $('.box').off('click', makeMove)
      break
      /* If the last move was the winner move, break would end the condition here.
      If there was no break keyword, 2nd block would run and overwrite winner
      message in #message area */
    } else if (!cells.includes('')) {
      $('#message').text('DRAW!!')
      $('.box').off('click', makeMove)
    }
  }
}

module.exports = {
  makeMove,
  setGame
}

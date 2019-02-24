'use strict'

const ui = require('./ui')
const bot = require('./bot')
// Array  that represents cells on the game board
let cells = ['', '', '', '', '', '', '', '', '']
// Variable that holds last players info, so that engine can check who was the last player
let lastPlayer = null

// For setting or resetting the game board
const setGame = function (type, signIn, level) {
  if (type === 'ai') {
    bot.resetBoardHistory()
    ui.setBoard()
    if (level === 'hard') {
      $('.box').on('click', bot.makeMove)
    } else {
      $('.box').on('click', (event, level) => bot.makeMove(event, 'easy'))
    }
  } else if (type === 'regular' && signIn === false) {
    cells = ['', '', '', '', '', '', '', '', '']
    lastPlayer = null
    ui.setBoard()
    $('.box').on('click', makeMove)
  } else if (type === 'regular' && signIn === true) {
    cells = ['', '', '', '', '', '', '', '', '']
    lastPlayer = null
    ui.setBoard()
    $('.box').on('click', makeMove)
  }
}

// Function that allows user to make move
const makeMove = function (event) {
  // Played cell's ID
  const id = event.target.id
  // Condition to check if the box is empty and who wast the last player?
  if (cells[id] !== '') {
    ui.alertPlayer()
  } else if (lastPlayer === 'o' || lastPlayer === null) {
    cells[id] = 'x'
    lastPlayer = 'x'
    ui.putX(id)
  } else {
    cells[id] = 'o'
    lastPlayer = 'o'
    ui.putO(id)
  }
  whoWon(id)
}

// Function to find winner
// (works during the game, when somebody wins, stops the game)
let isGameOver = false
const whoWon = function (id) {
  // Callback function for .reduce()
  const isSame = (acc, curr) => acc + curr
  // Cell tracks that should contain 3 'x's or 'o's in a row to create winner
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
    const winner = winnerTracks[track][0][0]
    // if there is a match
    if (trackValue === 'xxx' || trackValue === 'ooo') {
      ui.onWinner(winner, track, false)
      isGameOver = true
      break
      /* If the last move was the winner move, break would end the condition here.
      If there was no break keyword, 2nd block would run and overwrite winner
      message in #message area */
    } else if (!cells.includes('')) {
      ui.onDraw()
      isGameOver = true
    }
  }
  // send updates to the api
  // This hidden button is being used to trigger update process of a game on api
  // Because circular require is not possible, this file cannot be required by
  // 'ui.js'. So, this button is created to send a data to 'ui.js' through
  // 'events.js'. I needed this because I wasn't able to invoke a function Here
  // from 'ui.js'.
  $('#send-to-api').trigger('click', [id, isGameOver])
}

module.exports = {
  makeMove,
  setGame
}

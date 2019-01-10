'use strict'

const store = require('./../store.js')
const ui = require('./ui.js')
const gameLogic = require('./game-logic.js')

// give information about the game joined to the player
const onJoinGameSuccess = (response) => {
  store.game = response.game
  const game = store.game
  const playerX = game.player_x.email
  let playerO
  if (game.player_o) {
    playerO = game.player_o.email
  } else {
    playerO = 'None'
  }
  $('#message-data').html(`
    <h3>You have successfully joined ${playerX}'s game<h3>
    <h3>Game Info:</h3>
    `)
  $('#message-data').append(`
    <h5>Game ID: ${game.id} </h5>
    <h5>Player-1: ${playerX} </h5>
    <h5>Player-2: ${playerO} </h5>
    <h5>Game Status: ${game.over === true ? 'Finished' : 'Incomplete'} </h5>
    `)
  // create the current game on newly joined player's game board
  const cells = game.cells
  ui.setBoard()
  $('.box').on('click', gameLogic.makeMove)
  let i = 0
  cells.forEach(
    (cell) => {
      if (cell === 'x' || cell === 'o') {
        $('#' + i).text(cell)
        i = i + 1
      } else {
        i++
      }
    }
  )
  // Clean up the input field
  $('#join-id').val('')
}

const onJoinGameFailure = (response) => {
  $('#message-data').html('<h2>Failed.</h2>')
}

module.exports = {
  onJoinGameSuccess,
  onJoinGameFailure
}

'use strict'

const store = require('./../store.js')

const onJoinGameSuccess = (response) => {
  store.joinedGame = response.game
  const game = store.joinedGame
  $('#message-data').html('<p>You have successfully joined the game<p>')
  const playerX = game.player_x.email
  let playerO
  if (game.player_o) {
    playerO = game.player_o.email
  } else {
    playerO = 'None'
  }
  $('#message-data').append(`
    <h5>Game ID: ${game.id} </h5>
    <h5>Player-1: ${playerX} </h5>
    <h5>Player-2: ${playerO} </h5>
    <h5>Game Status: ${game.over === true ? 'Finished' : 'Incomplete'} </h5>
    `)
}

const onJoinGameFailure = (response) => {
  $('#message-data').html('<h2>Failed.</h2>')
}

module.exports = {
  onJoinGameSuccess,
  onJoinGameFailure
}

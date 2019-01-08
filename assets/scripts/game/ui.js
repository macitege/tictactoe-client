'use strict'

const store = require('./../store.js')

// Application Logic UI Starts Here

const setBoard = function () {
  $('#message').text('')
  $('#game-board').html(`
    <div class="row">
      <div id="0" class="box" over="false"></div>
      <div id="1" class="box" over="false"></div>
      <div id="2" class="box" over="false"></div>
    </div>
    <div class="row">
      <div id="3" class="box" over="false"></div>
      <div id="4" class="box" over="false"></div>
      <div id="5" class="box" over="false"></div>
    </div>
    <div class="row">
      <div id="6" class="box" over="false"></div>
      <div id="7" class="box" over="false"></div>
      <div id="8" class="box" over="false"></div>
    </div>
    `)
}

const putX = function (id) {
  $('#' + id).text('x').val('x')
}

const putO = function (id) {
  $('#' + id).text('o').val('o')
}

const onWinner = function (winner) {
  $('#message').text('Winner is ' + winner.toUpperCase())
  $('.box').off('click')
}

const onDraw = function () {
  $('#message').text('DRAW!!')
  $('.box').off('click')
}

const alertPlayer = function () {
  alert('Pick an empty cell')
}
// Application Logic UI Ends Here

// Game UI Starts Here

const onGetGamesSuccess = (response) => {
  $('#message-data').html('You got them in the console.')
  console.log(response)
}

const onGetGamesFailure = (response) => {
  $('#message-data').html('<h2> Have you signed in?</h2>')
}

const onCreateGameSuccess = (response) => {
  store.game = response.game
  $('#reset-button').css('visibility', 'visible')
  console.log(response.game)
}

const onCreateGameFailure = () => {
  $('#message-data').html('<h2> A server error occured. Check your internet connection and try again.</h2>')
}

const onShowGameSuccess = (response) => {
  store.showGame = response.game
  const game = store.showGame
  const playerX = game.player_x.email
  let playerO
  if (game.player_o) {
    playerO = game.player_o.email
  } else {
    playerO = 'None'
  }
  $('#message-data').html(`
    <h5>Game ID: ${game.id} </h5>
    <h5>Cells: ${game.cells.join('-')} </h5>
    <h5>Player-1: ${playerX} </h5>
    <h5>Player-2: ${playerO} </h5>
    <h5>Game Status: ${game.over === true ? 'Finished' : 'Incomplete'} </h5>
    `)
  $('#redisplay-game').show()
}

const onShowGameFailure = () => {
  $('#message-data').html('<h2>Check your game ID. It is wrong.</h2>')
}

const onUpdateGameSuccess = (cellID, updatedVal) => {
  $('#message').text('Game is updated. Put an ' + updatedVal + ' in ' + cellID)
}

const onUpdateGameFailure = () => {
  $('#message').text('Connection failure with server')
}

module.exports = {
  onWinner,
  onDraw,
  setBoard,
  alertPlayer,
  putX,
  putO,
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onShowGameSuccess,
  onShowGameFailure,
  onGetGamesSuccess,
  onGetGamesFailure
}

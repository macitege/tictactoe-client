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
  const gameID = response.game.id
  const cells = response.game.cells.join(', ')
  const over = response.game.over
  $('#message-data').html(`
    <h5>Game ID: ${gameID} </h5>
    <h5>Cells: ${cells} </h5>
    <h5>Cells: ${over} </h5>
    `)
}

const onShowGameFailure = () => {
  $('#message-data').html('<h2>Check your game ID. It is wrong.</h2>')
}

const onJoinGameSuccess = (response) => {
  console.log(response)
  $('#message-data').html('<h2>You have successfully joined the game</h2>')
}

const onJoinGameFailure = (response) => {
  $('#message-data').html('<h2>Failed.</h2>')
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
  onGetGamesFailure,
  onJoinGameSuccess,
  onJoinGameFailure
}

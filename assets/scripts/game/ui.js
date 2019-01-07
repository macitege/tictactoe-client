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
  console.log(response)
  $('#message-data').html('You got them in the console.')
}

const onGetGamesFailure = (response) => {
  $('#message-data').html('<h2> Have you signed in?</h2>')
}

const onCreateGameSuccess = (response) => {
  store.game = response.game
  console.log(store.game.id)
  $('#reset-button').css('visibility', 'visible')
}

const onCreateGameFailure = () => {
  alert('Please login to play the game.')
}

const onShowGameSuccess = (response) => {
  // console.log(response.game)
  const theGame = response.game
  const gameID = theGame.id
  const cells = theGame.cells.join(', ')
  $('#message-data').html(`
    <h5>Game ID: ${gameID} </h5>
    <h5>Cells: ${cells} </h5>
    `)
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

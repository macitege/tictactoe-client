'use strict'

const store = require('./../store.js')

// Application Logic UI Starts Here

const setBoard = function () {
  $('#message-game').html('<p>X Starts</p>')
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
  $('#message-game').html('<p>O\'s Turn</p>')
}

const putO = function (id) {
  $('#' + id).text('o').val('o')
  $('#message-game').html('<p>X\'s Turn</p>')
}

const onWinner = function (winner) {
  $('#message-game').html('<p>Winner is ' + winner.toUpperCase() + '</p>')
  $('.box').off('click')
  $('#message-game-info').html(`<h3>Game ID: ${store.game.id}</h3>`)
}

const onDraw = function () {
  $('#message-game').html('<p>It\'s a Tie!!</p>')
  $('#message-game-info').html(`<h3>Game ID: ${store.game.id}</h3>`)
  $('.box').off('click')
}

const alertPlayer = function () {
  $('#message-game').html('<p>Play on an empty cell.</p>')
}
// Application Logic UI Ends Here

// Game UI Starts Here

const onGetGamesSuccess = (response) => {
  $('#game-statistics').html(`
      <h5>Total games played: ${response.games.length} </h5>
    `)

  $('#history-table').html('')
  response.games.forEach((game) => {
    const gameID = game.id
    const playerX = game.player_x.email
    let playerO = 'None'
    if (game.player_o !== null) {
      playerO = game.player_o.email
    }
    const state = game.over
    $('#history-table').append(`
      <tr>
        <th scope="row"><a href="#">${gameID}</th>
        <td>${playerX}</td>
        <td>${playerO}</td>
        <td>${state}</td>
      </tr>
    `)
  })

  $('#history-table a').on('click', (event) => {
    console.log('works')
    $('#game-id').val(event.target.text)
    $('#show-game').trigger('submit')
  })
}

const onGetGamesFailure = (response) => {
  $('#message-data').html('<h3> ERROR. Try again.</h3>')
}

const onCreateGameSuccess = (response) => {
  store.game = response.game
  $('#create-game').hide()
  $('#reset-button').show()
  $('#message-game-info').html(`<h3>Playing... Current Game ID: ${store.game.id}</h3>`)
}

const onCreateGameFailure = () => {
  $('#message-game-info').html('<h2> A server error occured. Check your internet connection and try again.</h2>')
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
    <h5>Player-1: ${playerX} </h5>
    <h5>Player-2: ${playerO} </h5>
    <h5>Game Status: ${game.over === true ? 'Finished' : 'Incomplete'} </h5>
    `)
  $('#redisplay-game').show()
  $('show-game').trigger('reset')
}

const onShowGameFailure = () => {
  $('#message-data').html('<h2>Check your game ID. It is wrong.</h2>')
  $('show-game').trigger('reset')
}

const onUpdateGameSuccess = (cellID, updatedVal) => {}

const onUpdateGameFailure = () => {
  $('#message-game').text('Connection failure with server').css('color', 'red')
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

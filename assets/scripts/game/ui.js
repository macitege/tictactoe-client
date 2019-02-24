'use strict'

const store = require('./../store.js')

// Application Logic UI Starts Here
// Set board after clicking on Start button
const setBoard = function () {
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

// Put x on the cell
const putX = function (id, ai) {
  $('#' + id).html('<p>x</p>')
  // Inform players
  if (ai) {
    $('#message-game').html('<p>AI\'s Turn...</p>')
  } else {
    $('#message-game').html('<p>O\'s Turn</p>')
  }
}

// Put o and inform players
const putO = function (id, ai) {
  $('#' + id).html('<p>o</p>')
  if (ai) {
    $('#message-game').html('<p>Human\'s Turn...</p>')
  } else {
    $('#message-game').html('<p>X\'s Turn</p>')
  }
}

// When there is winner
const onWinner = function (winner, track, isAI) {
  const winnerTrack = track
  switch (winnerTrack) {
    case 'track0':
      $('#0, #1, #2').css('background-color', 'rgba(0, 230, 0, .4)')
      break
    case 'track1':
      $('#3, #4, #5').css('background-color', 'rgba(0, 230, 0, .4)')
      break
    case 'track2':
      $('#6, #7, #8').css('background-color', 'rgba(0, 230, 0, .4)')
      break
    case 'track3':
      $('#0, #3, #6').css('background-color', 'rgba(0, 230, 0, .4)')
      break
    case 'track4':
      $('#1, #4, #7').css('background-color', 'rgba(0, 230, 0, .4)')
      break
    case 'track5':
      $('#2, #5, #8').css('background-color', 'rgba(0, 230, 0, .4)')
      break
    case 'track6':
      $('#0, #4, #8').css('background-color', 'rgba(0, 230, 0, .4)')
      break
    case 'track7':
      $('#2, #4, #6').css('background-color', 'rgba(0, 230, 0, .4)')
      break
  }

  if (!isAI) {
    // Announce winner
    $('#message-game').html('<p>Winner is ' + winner.toUpperCase() + '</p>')
    // Turn off event handler on boxes
    $('.box').off('click')
    // Adjust player message
    if (store.game) {
      $('#message-game-info').html(`<p>Game ID: ${store.game.id}</p>`)
    }
  } else {
    if (winner === 'o') {
      $('#message-game').html('<p>Winner is Artificial Intelligence</p>')
    } else {
      $('#message-game').html('<p>Winner is Human Intelligence</p>')
    }
    $('.box').off('click')
    $('#message-game-info').html(`<p>Game: Human vs. AI</p>`)
  }
}

// When it's a tie announce it, adjust player message, turn off btn eventhandler
const onDraw = function (isAI) {
  if (!isAI) {
    $('#message-game').html('<p>> DRAW!!</p>')
    if (store.game) {
      $('#message-game-info').html(`<p>Game ID: ${store.game.id}</p>`)
    }
    $('.box').off('click').css('background-color', 'rgba(230, 0, 0, .4)')
  } else {
    $('#message-game').html('<p>> DRAW...</p>')
    $('.box').off('click').css('background-color', 'rgba(230, 0, 0, .4)')
  }
}

// Warn player if a filled cell is clicked
const alertPlayer = function () {
  $('#message-game').html('<p>Play on an empty cell.</p>')
}
// Application Logic UI Ends Here

// Game UI Starts Here
// Fetch all games from api, print them in a table on the modal
const onGetGamesSuccess = (response) => {
  // Print total games played by the player
  $('#game-statistics').html(`
      <h5>Total games played: ${response.games.length} </h5>
    `)

  // Create table for past games
  $('#history-table').html('')
  response.games.forEach((game) => {
    const gameID = game.id
    const playerX = game.player_x.email
    // Print none for if there is no 2nd player
    let playerO = 'None'
    if (game.player_o !== null) {
      playerO = game.player_o.email
    }
    const state = game.over
    $('#history-table').append(`
      <tr>
        <th scope="row"><a href="#pastGamesHead">${gameID}</th>
        <td>${playerX}</td>
        <td>${playerO}</td>
        <td>${state}</td>
      </tr>
    `)
  })
  // When a game id is clicked on past games table, trigger show game with the id
  $('#history-table a').on('click', (event) => {
    $('#game-id').val(event.target.text)
    $('#show-game').trigger('submit')
  })
}

const onGetGamesFailure = (response) => {
  $('#message-data').html('<h3> ERROR. Try again.</h3>')
}

// When a new game is created, inform player, hide start button, show restart button
const onCreateGameSuccess = (response) => {
  store.game = response.game
  // Show current game id to the player
  $('#message-game-info').html(`<p>Playing... Current Game ID: ${store.game.id}</p>`)
  $('#message-game').html('<p>X Starts</p>')
  $('#player-menu').hide()
  $('#back-to-menu, #reset-button').show()
}

const onCreateGameFailure = () => {
  $('#message-game-info').html('<h2> A server error occured. Check your internet connection and try again.</h2>')
}

// When a game is showed, print it in the related modal with the details about the game
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
    <p>Game ID: ${game.id} </p>
    <p>Player-1: ${playerX} </p>
    <p>Player-2: ${playerO} </p>
    <p>Game Status: ${game.over === true ? 'Finished' : 'Incomplete'} </p>
    `)
  // Show redisplay button to display shown game's last state on the game board
  $('#redisplay-game').show()
  // Reset the form in the modal
  $('#show-game').trigger('reset')
}

const onShowGameFailure = () => {
  $('#message-data').html('<p>Check your game ID. It is wrong.</p>')
  $('#show-game').trigger('reset')
}

const onUpdateGameSuccess = (cellID, updatedVal) => {
  // nothing to show until an error occurs
}

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

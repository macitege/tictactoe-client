'use strict'

const store = require('./../store.js')
const api = require('./api.js')
const ui = require('./ui.js')
const gameLogic = require('./game-logic.js')

const onGetGames = (event) => {
  event.preventDefault()
  const token = store.user.token
  api.getGames(token)
    .then(ui.onGetGamesSuccess)
    .catch(ui.onGetGamesFailure)
}

const onCreateGame = (event) => {
  event.preventDefault()
  $('#message-game').append('<p>X Starts</p>')
  const token = store.user.token
  api.createGame(token)
    // stores the game, makes reset button appear
    .then(ui.onCreateGameSuccess)
    // sets the game board when game is created
    .then(gameLogic.setGame)
    .catch(ui.onCreateGameFailure)
}

const onShowGame = (event) => {
  event.preventDefault()
  const id = $('#game-id').val()

  const token = store.user.token
  api.showGame(id, token)
    .then(ui.onShowGameSuccess)
    .catch(ui.onShowGameFailure)
}

const onRedisplayGame = (id) => {
  if (store.showGame) {
    const cells = store.showGame.cells
    ui.setBoard()
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
  } else {
    $('#message-data').text('ERROR')
  }
  $('.close').trigger('click')
  $('#message-game-info').html('<h3>Game ID "' + store.showGame.id + '" | Redisplay</h3>')
  $('#message-game, #message').text('')
  $('#create-game').text('Play a New Game')
  $('#reset-button').text('Play a New Game')
}

const onMove = (event, id, isGameOver) => {
  event.preventDefault()
  const cellID = id
  const gameID = store.game.id
  const token = store.user.token
  const val = $('#' + cellID).val().toString()
  const isOver = isGameOver
  const data = {
    'game': {
      'cell': {
        'index': cellID,
        'value': val
      },
      'over': isOver
    }
  }
  api.updateGame(token, gameID, data)
    .then((response) => {
      const updatedVal = response.game.cells[cellID]
      ui.onUpdateGameSuccess(cellID, updatedVal)
    })
    .catch(ui.onUpdateGameFailure)
}

module.exports = {
  onCreateGame,
  onMove,
  onShowGame,
  onGetGames,
  onRedisplayGame
}

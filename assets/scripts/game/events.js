'use strict'

const store = require('./../store.js')
const api = require('./api.js')
const ui = require('./ui.js')
const gameLogic = require('./game-logic.js')

const onGetGames = (event) => {
  event.preventDefault()
  if (store.user === undefined) {
    $('#message-data').html('<h2>Have you signed in?</h2>')
  }
  const token = store.user.token
  api.getGames(token)
    .then(ui.onGetGamesSuccess)
    .catch(ui.onGetGamesFailure)
}

const onCreateGame = (event) => {
  event.preventDefault()
  if (store.user === undefined) {
    $('#message-data').html('<h2>Please sign in to play.</h2>')
  }
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
  if (store.user === undefined) {
    $('#message-data').html('<h2>Sign in first</h2>')
  }
  const token = store.user.token
  api.showGame(id, token)
    .then(ui.onShowGameSuccess)
    .catch(ui.onShowGameFailure)
}

const onJoinGame = (event) => {
  event.preventDefault()
  const id = $('#join-id').val()
  if (store.user === undefined) {
    $('#message-data').html('<h2>Sign in and create a game first</h2>')
  }
  const token = store.user.token
  api.joinGame(id, token)
    .then(ui.onJoinGameSuccess)
    .catch(ui.onJoinGameFailure)
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
  onJoinGame
}

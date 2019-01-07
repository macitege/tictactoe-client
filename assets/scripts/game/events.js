'use strict'

const store = require('./../store.js')
const api = require('./api.js')
const ui = require('./ui.js')
const gameLogic = require('./game-logic.js')

const onCreateGame = (event) => {
  event.preventDefault()
  const token = store.user.token
  api.createGame(token)
    .then(ui.onCreateGameSuccess)
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

const onMove = (event) => {
  event.preventDefault()
  const cellID = Number(event.target.id)
  const gameID = store.game.id
  const token = store.user.token
  const val = $('#' + cellID).val().toString()
  const overAttr = $('#' + cellID).attr('over')
  const isOver = (overAttr === 'true')
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
  onShowGame
}

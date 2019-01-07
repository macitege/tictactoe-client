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

const onMove = (event) => {
  event.preventDefault()
  console.log('move happened on' + event.target)
}

module.exports = {
  onCreateGame,
  onMove
}

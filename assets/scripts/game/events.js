'use strict'

const store = require('./../store.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onCreateGame = (event) => {
  event.preventDefault()
  const token = store.user.token
  api.createGame(token)
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

module.exports = {
  onCreateGame
}

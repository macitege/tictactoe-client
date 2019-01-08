'use strict'

const store = require('./../store.js')
const api = require('./api.js')
const ui = require('./ui.js')

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

module.exports = {
  onJoinGame
}

'use strict'

const store = require('./../store.js')
const api = require('./api.js')

const onCreateGame = (event) => {
  event.preventDefault()
  const token = store.user.token
  api.createGame(token)
    .then((response) => { console.log(response) })
    .catch(() => { console.log('Failed') })
}

module.exports = {
  onCreateGame
}

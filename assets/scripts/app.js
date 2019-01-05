'use strict'

const gameLogic = require('./game/game-logic')
const events = require('./game/events.js')

$(() => {
  gameLogic.setGame()
  $('#reset-button').on('click', gameLogic.setGame)
  $('#sign-up').on('submit', events.onSignUp)
})

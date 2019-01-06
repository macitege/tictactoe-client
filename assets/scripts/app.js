'use strict'

const gameLogic = require('./game/game-logic.js')
const events = require('./auth/events.js')

$(() => {
  gameLogic.setGame()
  $('#reset-button').on('click', gameLogic.setGame)
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#changepw').on('submit', events.onChangePW)
  $('#sign-out').on('click', events.onSignOut)
})

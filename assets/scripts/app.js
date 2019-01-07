'use strict'

const gameLogic = require('./game/game-logic.js')
const accountEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

$(() => {
  gameLogic.setGame()
  // $('.box').on('click', gameEvents.onMove)
  $('#reset-button').on('click', gameLogic.setGame).css('visibility', 'visible')
  $('#sign-up').on('submit', accountEvents.onSignUp)
  $('#sign-in').on('submit', accountEvents.onSignIn)
  $('#changepw').on('submit', accountEvents.onChangePW)
  $('#sign-out').on('click', accountEvents.onSignOut)
  $('#create-game').on('click', gameEvents.onCreateGame)
  $('#show-game').on('submit', gameEvents.onShowGame)
})

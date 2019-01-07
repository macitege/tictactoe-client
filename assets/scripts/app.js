'use strict'

const accountEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

$(() => {
  // $('.box').on('click', gameEvents.onMove)
  $('#create-game').on('click', gameEvents.onCreateGame)
  // reset button creates a new game and refreshes the gameboard
  $('#reset-button').on('click', gameEvents.onCreateGame)
  $('#sign-up').on('submit', accountEvents.onSignUp)
  $('#sign-in').on('submit', accountEvents.onSignIn)
  $('#changepw').on('submit', accountEvents.onChangePW)
  $('#sign-out').on('click', accountEvents.onSignOut)
  $('#show-game').on('submit', gameEvents.onShowGame)
  $('#get-games').on('click', gameEvents.onGetGames)
})
// .css('visibility', 'visible')

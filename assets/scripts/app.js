'use strict'

const accountEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')
const multiPlayer = require('./game/multiplayer-events.js')

$(() => {
  // START GAME
  $('#create-game').on('click', gameEvents.onCreateGame)
  // reset button creates a new game and refreshes the gameboard
  $('#reset-button').on('click', gameEvents.onCreateGame)
  $('#sign-up').on('submit', accountEvents.onSignUp)
  $('#sign-in').on('submit', accountEvents.onSignIn)
  $('#changepw').on('submit', accountEvents.onChangePW)
  $('#sign-out').on('click', accountEvents.onSignOut)
  $('#show-game').on('submit', gameEvents.onShowGame)
  $('#redisplay-game').on('click', gameEvents.onRedisplayGame).hide()
  $('#get-games').on('click', gameEvents.onGetGames)
  $('#join-game').on('submit', multiPlayer.onJoinGame)
  // $('#join-game').on('click', multiPlayer.stream)
  $('#send-to-api').on('click', gameEvents.onMove)
})
// .css('visibility', 'visible')

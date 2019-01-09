'use strict'

const accountEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')
const multiPlayer = require('./game/multiplayer-events.js')

$('#account-wrapper').hide()
$('#create-game').hide()
$('#reset-button').hide()
$('#redisplay-game').on('click', gameEvents.onRedisplayGame).hide()
$('#get-games').on('click', gameEvents.onGetGames).hide()

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
  $('#join-game').on('submit', multiPlayer.onJoinGame)
  // $('#join-game').on('click', multiPlayer.stream)
  $('#send-to-api').on('click', gameEvents.onMove)
  $('#past-games-button').on('click', () => {
    $('#get-games').trigger('click')
  })
  $('#changePwModal, #gameHistoryModal, #signUpModal')
    .on('hidden.bs.modal', () => {
      $(this).find('form').trigger('reset')
    })
  $('#gameHistoryModal').on('hidden.bs.modal', () => {
    $('#message-data').html('')
    $('#redisplay-game').hide()
  })
})

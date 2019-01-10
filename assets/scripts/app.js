'use strict'

const accountEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')
const multiPlayer = require('./game/multiplayer-events.js')

// These jQuerys must happen before everything to ensure nothing will appear
// on the page that are not supposed to appear. That's why they are seperated.
$('#account-wrapper').hide()
$('#create-game').hide()
$('#reset-button').hide()
$('#redisplay-game').on('click', gameEvents.onRedisplayGame).hide()
$('#get-games').on('click', gameEvents.onGetGames).hide()

$(() => {
  // Start game
  $('#create-game').on('click', gameEvents.onCreateGame)
  // reset button creates a new game and refreshes the gameboard
  $('#reset-button').on('click', gameEvents.onCreateGame)
  $('#sign-up').on('submit', accountEvents.onSignUp)
  $('#sign-in').on('submit', accountEvents.onSignIn)
  $('#changepw').on('submit', accountEvents.onChangePW)
  $('#sign-out').on('click', accountEvents.onSignOut)
  $('#show-game').on('submit', gameEvents.onShowGame)
  $('#join-game').on('submit', multiPlayer.onJoinGame)

  // This button sends update request to api. Its reason is explained in
  // 'game-logic.js' file in the 'whoWon()' function
  $('#send-to-api').on('click', gameEvents.onMove)

  // When past games section (modal) is closed, clear forms
  $('#gameHistoryModal').on('hidden.bs.modal', () => {
    $('#message-data').html('')
    $('#redisplay-game').hide()
    $('#show-game').trigger('reset')
    $('#join-game').trigger('reset')
  })

  // When user try to go their past games section in account dropdown
  // Game History button triggers the function that brings all past games' data
  // So the games' data would be ready
  $('#past-games-button').on('click', () => {
    $('#get-games').trigger('click')
  })

  // Once modals are closed specified below, clear the form fields.
  $('#changePwModal, #gameHistoryModal, #signUpModal')
    .on('hidden.bs.modal', () => {
      $('#changepw, #sign-up').trigger('reset')
    })
    // This code below will be used for multiPlayer actions later
    // $('#join-game').on('click', multiPlayer.stream)
})

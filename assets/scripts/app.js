'use strict'

import Typed from 'typed.js'
const accountEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')
const multiPlayer = require('./game/multiplayer-events.js')
const ui = require('./game/ui')
const gameLogic = require('./game/game-logic.js')
// These jQuerys must happen before everything to ensure nothing will appear
// on the page that are not supposed to appear. That's why they are seperated.
$('#account-wrapper').hide()
$('#create-game').hide()
$('#reset-button, #easy, #hard, #back-button').hide()
$('#redisplay-game').on('click', gameEvents.onRedisplayGame).hide()
$('#get-games').on('click', gameEvents.onGetGames).hide()

$(() => {
  // Start game
  $('#create-game').on('click', gameEvents.onCreateGame)
  // reset button creates a new game and refreshes the gameboard
  $('#sign-up').on('submit', accountEvents.onSignUp)
  $('#sign-in').on('submit', accountEvents.onSignIn)
  $('#changepw').on('submit', accountEvents.onChangePW)
  $('#sign-out').on('click', accountEvents.onSignOut)
  $('#show-game').on('submit', gameEvents.onShowGame)
  $('#join-game').on('submit', multiPlayer.onJoinGame)
  $('#back-button').on('click', gameEvents.showMenu)

  $('#play-without-signin, #play-against-ai').on('click', (event) => {
    if (event.target.id === 'play-without-signin') {
      gameLogic.setGame('regular', false)
      $('#reset-button').on('click', () => {
        gameLogic.setGame('regular', false)
      })
    } else {
      gameLogic.setGame('ai', false)
      $('#reset-button').on('click', () => {
        gameLogic.setGame('ai', false)
      })
    }

    $('#play-without-signin, #play-against-ai').hide()
    $('#back-button, #reset-button').show()
  })

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
  $('#join-game').on('submit', multiPlayer.stream)

// TYPED JS
  // const typed = new Typed('#message', {
  //   strings: ['The deadliest game ever...', 'Tic Tac TOE'],
  //   typeSpeed: 60
  // })
  // $('#message').text(typed)
})

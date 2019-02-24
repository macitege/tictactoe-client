'use strict'

// import Typed from 'typed.js'
const accountEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')
const multiPlayer = require('./game/multiplayer-events.js')
const gameLogic = require('./game/game-logic.js')
// These jQuerys must happen before everything to ensure nothing will appear
// on the page that are not supposed to appear. That's why they are seperated.
$('#account-wrapper, .thinking').hide()
$('#create-game').hide()
$('#reset-button, #easy, #hard, #back-button, #back-to-menu').hide()
$('#redisplay-game').on('click', gameEvents.onRedisplayGame).hide()
$('#get-games').on('click', gameEvents.onGetGames).hide()
$(() => {
  // Start game
  $('#create-game').on('click', (event) => {
    gameEvents.onCreateGame(event)
    $('#reset-button').on('click', gameEvents.onCreateGame)
  })
  // reset button creates a new game and refreshes the gameboard
  $('#sign-up').on('submit', accountEvents.onSignUp)
  $('#sign-in').on('submit', accountEvents.onSignIn)
  $('#changepw').on('submit', accountEvents.onChangePW)
  $('#sign-out').on('click', accountEvents.onSignOut)
  $('#show-game').on('submit', gameEvents.onShowGame)
  $('#join-game').on('submit', multiPlayer.onJoinGame)
  $('#back-button, #back-to-menu').on('click', gameEvents.showMenu)

  $('#multiplayer, #play-against-ai').on('click', (event) => {
    if (event.target.id === 'multiplayer') {
      gameLogic.setGame('regular', false)
      $('#back-to-menu, #reset-button').show()
      $('#message-game').html('<p>X Starts</p>')
      $('#reset-button').off('click')
      $('#reset-button').on('click', () => {
        gameLogic.setGame('regular', false)
        $('#message-game').html('<p>X Starts</p>')
      })
    } else {
      $('#create-game').hide()
      $('#reset-button').off('click')
      $('#easy, #hard').show().on('click', (event) => {
        if (event.target.id === 'hard') {
          $('#easy, #hard, #back-button').hide()
          $('#reset-button, #back-to-menu').show()
          $('#message-game').html('<p>Human Starts</p>')
          gameLogic.setGame('ai', false, 'hard')
          $('#reset-button').on('click', () => {
            $('#message-game').html('<p>Human Starts</p>')
            gameLogic.setGame('ai', false, 'hard')
          })
        } else {
          $('#easy, #hard, #back-button').hide()
          $('#reset-button, #back-to-menu').show()
          $('#message-game').html('<p>Human Starts</p>')
          gameLogic.setGame('ai', false, 'easy')

          $('#reset-button').on('click', () => {
            $('#message-game').html('<p>Human Starts</p>')
            gameLogic.setGame('ai', false, 'easy')
          })
        }
      })

      $('#back-button').show()
    }

    $('#multiplayer, #play-against-ai').hide()
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
    $('#authCollapsible').collapse('hide')
    $('#back-to-menu').trigger('click')
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

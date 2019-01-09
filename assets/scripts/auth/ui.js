'use strict'

const store = require('../store.js')

const onSignUpSuccess = () => {
  $('#message').html('<p>Sign up successful.</p>').attr('class', 'success')
  setTimeout(() => { $('#message').fadeOut(500) }, 2000)
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('.close').trigger('click')
  $('#sign-in-email').css('border-color', '#9e9e9e')
  $('#sign-in-password').css('border-color', '#9e9e9e')
}

const onSignUpFailure = () => {
  $('#sign-up-message').html('<p>Mail address exists.</p>').attr('class', 'fail')
  setTimeout(() => { $('#sign-up-message >p').fadeOut(500) }, 2000)
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  store.user = response.user
  $('#user-info').text('Welcome, ' + store.user.email + '!')
  $('#message').html('<p>Sign in successful.</p>').attr('class', 'success')
  setTimeout(() => { $('#message >p').fadeOut(500) }, 2000)
  $('#sign-in').trigger('reset')
  $('.sign-in-wrapper').hide()
  $('.account-wrapper').css('visibility', 'visible').fadeIn(400)
  $('#sign-in-email').css('border-color', '#9e9e9e')
  $('#sign-in-password').css('border-color', '#9e9e9e')
  $('#create-game').show()
  $('#game-board').html('<p>Click Start</p>')
  $('#pastGamesHead').text('Past Games of ' + store.user.email)
  $('#get-games').trigger('click')
}

const onSignInFailure = () => {
  $('#message').html('<p>Email address or password is wrong.</p>').attr('class', 'fail')
  $('#sign-in-email').css('border-color', '#f44')
  $('#sign-in-password').css('border-color', '#f44')
  setTimeout(() => { $('#message >p').fadeOut(500) }, 2000)
  $('#sign-up').trigger('reset')
}

const onChangePWSuccess = () => {
  $('#changepw-message').html('<p>Your password is changed.</p>').attr('class', 'success')
  setTimeout(() => { $('#changepw-message >p').fadeOut(500) }, 2000)
  $('#changepw').trigger('reset')
  setTimeout(() => { $('.close').trigger('click') }, 1000)
}

const onChangePWFailure = () => {
  $('#changepw-message').html('<p>Password is incorrect.</p>').attr('class', 'fail')
  setTimeout(() => { $('#changepw-message >p').fadeOut(500) }, 2000)
  $('#changepw').trigger('reset')
}

const onSignOutSuccess = (response) => {
  store.user = null
  store.game = null
  store.showGame = null
  $('#message').html('<p>Sign out successful.</p>')
  setTimeout(() => { $('#message >p').fadeOut(500) }, 2000)
  $('#game-board').html('')
  $('#reset-button').hide()
  $('.account-wrapper').css('visibility', 'hidden').hide()
  $('.sign-in-wrapper').fadeIn(200)
  $('#message-game, #message-game-info').html('')
  $('#create-game').hide()
  $('#game-board').html('<p>Please sign in to play.</p>')
}

const onSignOutFailure = (response) => {
  $('#message').html('<p>Sign out failed. Connection error.</p>').attr('class', 'fail')
  setTimeout(() => { $('#message >p').fadeOut(500) }, 2000)
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePWSuccess,
  onChangePWFailure,
  onSignOutSuccess,
  onSignOutFailure
}

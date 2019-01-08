'use strict'

let store = require('../store.js')

const onSignUpSuccess = () => {
  $('#sign-up-message').text('Sign up successful.').attr('class', 'success')
  $('#sign-up').trigger('reset')
}

const onSignUpFailure = () => {
  $('#sign-up-message').text('Sign up failed. Mail address exists.').attr('class', 'fail')
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  store.user = response.user
  $('#sign-in-message').text('Sign in successful.').attr('class', 'success')
  $('#sign-in').trigger('reset')
}

const onSignInFailure = () => {
  $('#sign-in-message').text('Email address or password is wrong.').attr('class', 'fail')
  $('#sign-up').trigger('reset')
}

const onChangePWSuccess = () => {
  $('#changepw-message').text('Your password is changed.').attr('class', 'success')
  $('#changepw').trigger('reset')
}

const onChangePWFailure = () => {
  $('#changepw-message').text('Password is not correct.').attr('class', 'fail')
  $('#changepw').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('#sign-out-message').text('Successfully signed out.').attr('class', 'success')
  $('#game-board').html('')
  $('#reset-button').hide()
  store = {}
}

const onSignOutFailure = (response) => {
  $('#sign-out-message').text('Sign out failed. Connection error or you are not signed in.').attr('class', 'fail')
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

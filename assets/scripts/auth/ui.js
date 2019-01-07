'use strict'

const store = require('../store.js')

const onSignUpSuccess = () => {
  $('#message').text('Sign up successful')
  $('#sign-up').trigger('reset')
}

const onSignUpFailure = () => {
  $('#message').text('Sign up failed. This email has signed up before.')
}

const onSignInSuccess = (response) => {
  store.user = response.user
  console.log(store.user.token)
  $('#message').text('Sign in successful')
  $('#sign-in').trigger('reset')
}

const onSignInFailure = () => {
  $('#message').text('Sign in failed. This email or password is wrong. Or there is no such an account.')
}

const onChangePWSuccess = () => {
  $('#message').text('Change password successful')
  $('#changepw').trigger('reset')
}

const onChangePWFailure = () => {
  $('#message').text('Change password failed.')
}

const onSignOutSuccess = (response) => {
  $('#message').text('Sign out successful')
}

const onSignOutFailure = (response) => {
  $('#message').text('Sign out failed.')
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

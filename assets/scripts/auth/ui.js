'use strict'

const store = require('../store')
const onSignUpSuccess = () => {
  $('#message').text('Sign up successfull')
  $('#sign-up').trigger('reset')
}

const onSignUpFailure = () => {
  $('#message').text('Sign up failed. This email has signed up before.')
  $('#email-up').css('border-color', 'red')
}

const onSignInSuccess = (response) => {
  store.user = response.user
  $('#message').text('Sign in successfull')
  $('#sign-up').trigger('reset')
}

const onSignInFailure = () => {
  $('#message').text('Sign in failed. This email or password is wrong. Or there is no such an account.')
  $('#email-up').css('border-color', 'red')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure
}

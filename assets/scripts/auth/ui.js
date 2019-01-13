'use strict'

const store = require('../store.js')

const onSignUpSuccess = () => {
  // Message for user
  $('#message').html('<p>Sign up successful.</p>').attr('class', 'success')
  setTimeout(() => { $('#message').fadeOut(500) }, 2000)
  // Clear sign up form and also sign in form if any text is left
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  // When user signed up successfully trigger close button of the modal
  $('.close').trigger('click')
  // If user tried to sign in with improper credentials and input
  // borders turned to red below code turns them to natural state
  $('#sign-in-email').css('border-color', '#9e9e9e')
  $('#sign-in-password').css('border-color', '#9e9e9e')
}

const onSignUpFailure = () => {
  // Message to user
  $('#sign-up-message').html('<p>Mail address exists.</p>').attr('class', 'fail')
  setTimeout(() => { $('#sign-up-message >p').fadeOut(500) }, 2000)
  // reset the form
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  // Save user info to store
  store.user = response.user
  // Greet user at top right corner
  $('#user-info').html('Welcome, <strong>' + store.user.email + '!</strong>')
  // Message to user
  $('#message').html('<p>Sign in successful.</p>').attr('class', 'success')
  setTimeout(() => { $('#message >p').fadeOut(500) }, 2000)
  // reset the form
  $('#sign-in').trigger('reset')
  // Hide all content that are standing for "not signed in user"
  $('.sign-in-wrapper').hide()
  // Show content for signed in user
  $('.account-wrapper').css('visibility', 'visible').fadeIn(400)
  // If invalid credentials are used and input borders turned red before
  // Turn the borders in neutral color state
  $('#sign-in-email').css('border-color', '#9e9e9e')
  $('#sign-in-password').css('border-color', '#9e9e9e')
  // Show start button for game
  $('#create-game').show()
  // Change the warning "Please sign in" on the game board to "Click Start"
  $('#game-board').html('Have Fun!!!')
  // Place users name in the Past Games Modal
  $('#pastGamesHead').text('Past Games of ' + store.user.email)
  // Fetch user's past games in the Past Games Modal
  $('#get-games').trigger('click')
}

const onSignInFailure = () => {
  // Message to user
  $('#message').html('<p>Email address or password is wrong.</p>').attr('class', 'fail')
  setTimeout(() => { $('#message >p').fadeOut(500) }, 2000)
  // Turn input borders into color red
  $('#sign-in-email').css('border-color', '#f44')
  $('#sign-in-password').css('border-color', '#f44')
  // reset the form
  $('#sign-in').trigger('reset')
}

const onChangePWSuccess = () => {
  // Message to user
  $('#changepw-message').html('<p>Your password is changed.</p>').attr('class', 'success')
  setTimeout(() => { $('#changepw-message >p').fadeOut(500) }, 2000)
  // Reset the form
  $('#changepw').trigger('reset')
  // Close the modal after one second
  setTimeout(() => { $('.close').trigger('click') }, 1000)
}

const onChangePWFailure = () => {
  // Message to user
  $('#changepw-message').html('<p>Password is incorrect.</p>').attr('class', 'fail')
  setTimeout(() => { $('#changepw-message >p').fadeOut(500) }, 2000)
  // reset the form
  $('#changepw').trigger('reset')
}

const onSignOutSuccess = (response) => {
  // Delete user info from store
  store.user = null
  store.game = null
  store.showGame = null
  // Message to user
  $('#message').html('<p>Sign out successful.</p>')
  setTimeout(() => { $('#message >p').fadeOut(500) }, 2000)
  // Set game board off and hide game related buttons, clean message fields
  $('#game-board').html('')
  $('#create-game').hide()
  $('#reset-button').hide()
  $('#message-game, #message-game-info').html('')
  $('#game-board').html('<p>Please sign in to play.</p>')
  // Change account corner to sign-in sign-up corner
  $('.account-wrapper').css('visibility', 'hidden').hide()
  $('.sign-in-wrapper').fadeIn(200)
}

const onSignOutFailure = (response) => {
  // Warn user that there is a connection failure
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

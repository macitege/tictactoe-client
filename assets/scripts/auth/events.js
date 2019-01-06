'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onChangePW = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const token = store.user.token
  api.changePW(data, token)
    .then(ui.onChangePWSuccess)
    .catch(ui.onChangePWFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePW
}

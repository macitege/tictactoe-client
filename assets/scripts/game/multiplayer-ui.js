'use strict'

const store = require('./../store.js')

const onJoinGameSuccess = (response) => {
  console.log(response)
  $('#message-data').html('<h2>You have successfully joined the game</h2>')
}

const onJoinGameFailure = (response) => {
  $('#message-data').html('<h2>Failed.</h2>')
}

module.exports = {
  onJoinGameSuccess,
  onJoinGameFailure
}

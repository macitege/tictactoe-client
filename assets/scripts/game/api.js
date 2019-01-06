'use strict'

const config = require('./../config.js')

const createGame = (token) => {
  return $.ajax({
    url: config.apiUrl + '/games/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + token
    },
    data: ''
  })
}

module.exports = {
  createGame
}

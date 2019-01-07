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

const showGame = (id, token) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const updateGame = (token, gameID, data) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + gameID,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + token
    },
    data: data
  })
}

module.exports = {
  createGame,
  updateGame,
  showGame
}

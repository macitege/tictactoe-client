'use strict'

const gameLogic = require('./game/game-logic')

$(() => {
  gameLogic.setGame()
  // $('.box').on('click', gameLogic.makeMove)
  $('#reset-button').on('click', gameLogic.setGame)
})

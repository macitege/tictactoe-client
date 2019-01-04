'use strict'

const gameLogic = require('./game-logic')

$(() => {
  $('.box').on('click', gameLogic.makeMove)
})

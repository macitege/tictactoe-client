
const gameLogic = require('./game-logic')

const setBoard = function () {
  $('#message').text('')
  $('.game-board').html(`
    <div class="row">
      <div id="0" class="box"></div>
      <div id="1" class="box"></div>
      <div id="2" class="box"></div>
    </div>
    <div class="row">
      <div id="3" class="box"></div>
      <div id="4" class="box"></div>
      <div id="5" class="box"></div>
    </div>
    <div class="row">
      <div id="6" class="box"></div>
      <div id="7" class="box"></div>
      <div id="8" class="box"></div>
    </div>
    `)
}

const putX = function (id) {
  $('#' + id).text('x')
}

const putO = function (id) {
  $('#' + id).text('o')
}

const onWinner = function (winner) {
  $('#message').text('Winner is ' + winner.toUpperCase())
  $('.box').off('click', gameLogic.makeMove)
}

const onDraw = function () {
  $('#message').text('DRAW!!')
  $('.box').off('click', gameLogic.makeMove)
}

const alertPlayer = function () {
  alert('Pick an empty cell')
}

module.exports = {
  onWinner,
  onDraw,
  setBoard,
  alertPlayer,
  putX,
  putO
}

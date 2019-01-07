'use strict'

// Application Logic UI Starts Here

const setBoard = function () {
  $('#message').text('')
  $('#game-board').html(`
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
  $('#' + id).text('x').val('x')
  console.log($('#' + id).val() + ' for ' + 'id: ' + id)
}

const putO = function (id) {
  $('#' + id).text('o').val('o')
  console.log($('#' + id).val() + ' for ' + 'id: ' + id)
}

const onWinner = function (winner) {
  $('#message').text('Winner is ' + winner.toUpperCase())
  $('.box').off('click')
}

const onDraw = function () {
  $('#message').text('DRAW!!')
  $('.box').off('click')
}

const alertPlayer = function () {
  alert('Pick an empty cell')
}
// Application Logic UI Ends Here

// Game UI Starts Here

const onCreateGameSuccess = (response) => {
  console.log(response)
  $('#reset-button').css('visibility', 'visible')
}

const onCreateGameFailure = () => {
  alert('Please login to play the game.')
}

module.exports = {
  onWinner,
  onDraw,
  setBoard,
  alertPlayer,
  putX,
  putO,
  onCreateGameSuccess,
  onCreateGameFailure
}

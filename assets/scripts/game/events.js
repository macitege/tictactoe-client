'use strict'

const store = require('./../store.js')
const api = require('./api.js')
const ui = require('./ui.js')
const gameLogic = require('./game-logic.js')

// Api call for fetchin all games
const onGetGames = (event) => {
  event.preventDefault()
  const token = store.user.token
  api.getGames(token)
    .then(ui.onGetGamesSuccess)
    .catch(ui.onGetGamesFailure)
}

// Create a game on api
const onCreateGame = (event) => {
  event.preventDefault()
  $('#message-game').html('<p>X Starts</p>')
  const token = store.user.token
  api.createGame(token)
    // stores the game, makes reset button appear
    .then(ui.onCreateGameSuccess)
    // sets the game board when game is created
    .then(gameLogic.setGame)
    .catch(ui.onCreateGameFailure)
}
// Bring up a game by id
const onShowGame = (event) => {
  event.preventDefault()
  const id = $('#game-id').val()

  const token = store.user.token
  api.showGame(id, token)
    .then(ui.onShowGameSuccess)
    .catch(ui.onShowGameFailure)
}

// Bring up a game's last state and display it on the game board
const onRedisplayGame = (id) => {
  if (store.showGame) {
    const cells = store.showGame.cells
    ui.setBoard()
    let i = 0
    cells.forEach(
      (cell) => {
        if (cell === 'x' || cell === 'o') {
          $('#' + i).text(cell)
          i = i + 1
        } else {
          i++
        }
      }
    )
  } else {
    $('#message-data').text('ERROR')
  }
  $('.close').trigger('click')
  $('#message-game-info').html('<h3>Game ID "' + store.showGame.id + '" | Redisplay</h3>')
  $('#message-game, #message').text('')
  $('#create-game').text('Play a New Game')
  $('#reset-button').text('Play a New Game')
}

/* This function is being triggered by a hidden button named 'send-to-api'
Whenever the gameboard is initialized with start button, an event handler is
being assigned on every cell with 'makeMove' function. Make move function
puts the proper sign on the cell and invokes 'whoWon' function to evaluate
the board if there is a winner.
And finally, 'whoWon' function invokes this function (onMove) and this Function
sends the updated game information to api. Id and isGameOver arguments passed
by 'whoWon' function. */
const onMove = (event, id, isGameOver) => {
  event.preventDefault()
  const cellID = id
  const gameID = store.game.id
  const token = store.user.token
  // pull the text inside the cell by id passed by former function 'whoWon'
  const val = $('#' + cellID).val().toString()
  const isOver = isGameOver
  // create data object to sent the api
  const data = {
    'game': {
      'cell': {
        'index': cellID,
        'value': val
      },
      'over': isOver
    }
  }
  // api request
  api.updateGame(token, gameID, data)
    .then((response) => {
      const updatedVal = response.game.cells[cellID]
      ui.onUpdateGameSuccess(cellID, updatedVal)
    })
    .catch(ui.onUpdateGameFailure)
}

module.exports = {
  onCreateGame,
  onMove,
  onShowGame,
  onGetGames,
  onRedisplayGame
}

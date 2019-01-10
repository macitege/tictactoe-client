'use strict'

const store = require('./../store.js')
const api = require('./api.js')
const multiplayerUI = require('./multiplayer-ui.js')
const resourceWatcher = require('./resource-watcher.js')
const config = require('./../config.js')

// Join other games as player_o
const onJoinGame = (event) => {
  event.preventDefault()
  // Pull the game id from input field
  const id = $('#join-id').val()
  const token = store.user.token
  api.joinGame(id, token)
    .then(multiplayerUI.onJoinGameSuccess).then(() => { stream() })
    .catch(multiplayerUI.onJoinGameFailure)
}

// function for watch action on api (works well but not now how to display it)
// from opponents board
const stream = () => {
  const id = store.game.id
  const token = store.user.token
  const watchURL = config.apiUrl + '/games/' + id + '/watch'
  // console.log('game id is: ' + id,
  // 'game token is: ' + token,
  // 'watchURL is: ' + watchURL)
  const gameWatcher = resourceWatcher(watchURL, {
    Authorization: 'Token token=' + token
  })

  gameWatcher.on('change', function (data) {
    // console.log(data)
    if (data.game && data.game.cells) {
      const diff = changes => {
        const before = changes[0]
        const after = changes[1]
        for (let i = 0; i < after.length; i++) {
          if (before[i] !== after[i]) {
            return {
              index: i,
              value: after[i]
            }
          }
        }

        return { index: -1, value: '' }
      }

      const cell = diff(data.game.cells)
      $('#watch-index').val(cell.index)
      $('#watch-value').val(cell.value)
    } else if (data.timeout) { // not an error
      gameWatcher.close()
    }
  })

  gameWatcher.on('error', function (e) {
    console.error('an error has occurred with the stream', e)
  })
}

module.exports = {
  onJoinGame,
  stream
}

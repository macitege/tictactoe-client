'use strict'

const ui = require('./ui')

// Array  that represents cells on the game board
let cells = ['', '', '', '', '', '', '', '', '']
const resetBoardHistory = () => { cells = ['', '', '', '', '', '', '', '', ''] }
// Variable that holds last players info, so that engine can check who was the last player

const winnerTracks = {
  track0: [0, 1, 2],
  track1: [3, 4, 5],
  track2: [6, 7, 8],
  track3: [0, 3, 6],
  track4: [1, 4, 7],
  track5: [2, 5, 8],
  track6: [0, 4, 8],
  track7: [2, 4, 6]
}
// Callback function for .reduce()
const isSame = (acc, curr) => acc + curr

// Function that allows user to make move
const makeMove = function (event, level) {
  $('.box').off('click')
  // Played cell's ID
  const id = event.target.id
  // Condition to check if the box is empty and who wast the last player?
  if (cells[id] !== '') {
    console.log(cells)
    console.log(id)
    console.log(cells)
    ui.alertPlayer()
    $('.box').on('click', makeMove)
  } else if (level === 'easy') {
    cells[id] = 'x'
    ui.putX(id)
    setTimeout(() => {
      botPlayEasy()
      whoWon(id)
    }, 1000)
  } else {
    cells[id] = 'x'
    ui.putX(id)
    setTimeout(() => {
      botPlayHard()
      whoWon(id)
    }, 1000)
  }
}

// AI BOT
const botPlayHard = () => {
  let shouldPlay = true
  const tracksArr = []
  for (const track in winnerTracks) {
    tracksArr.push(winnerTracks[track].map(i => cells[i]).reduce(isSame))
  }
  // IF THERE IS TWO O IN SAME ROW, FILL THIRD CELL
  for (let i = 0; i < 8; i++) {
    if (shouldPlay) {
      if (tracksArr[i] === 'oo') {
        const theTrack = winnerTracks['track' + i]
        for (let j = 0; j < 3; j++) {
          if (cells[theTrack[j]] === '') {
            cells[theTrack[j]] = 'o'
            ui.putO(theTrack[j])
            shouldPlay = false
          }
        }
      }
    }
  }
  // IF THERE IS TWO X IN A ROW, FILL THIRD ROW
  for (let i = 0; i < 8; i++) {
    if (shouldPlay) {
      if (tracksArr[i] === 'xx') {
        const theTrack = winnerTracks['track' + i]
        for (let j = 0; j < 3; j++) {
          if (cells[theTrack[j]] === '') {
            cells[theTrack[j]] = 'o'
            ui.putO(theTrack[j])
            shouldPlay = false
          }
        }
      }
    }
  }
  // IF MIDDLE CELL IS VACANT PUT O
  if (cells[4] === '' && shouldPlay) {
    cells[4] = 'o'
    ui.putO(4)
    shouldPlay = false
  }
  // IF MIDDLE CELL IS OCCUPIED PUT ON ANY OF VACANT CORNER CELLS
  if (cells[4] !== '' && shouldPlay) {
    shouldPlay = false
    const possibleCells = [cells[0], cells[2], cells[6], cells[8]]
    const vacantCellIndex = []
    for (let i = 0; i < 4; i++) {
      if (possibleCells[i] === '') {
        vacantCellIndex.push(i)
      }
    }
    const randomNum = Math.floor(Math.random() * vacantCellIndex.length)
    switch (vacantCellIndex[randomNum]) {
      case 0:
        cells[0] = 'o'
        ui.putO(0)
        break
      case 1:
        cells[2] = 'o'
        ui.putO(2)
        break
      case 2:
        cells[6] = 'o'
        ui.putO(6)
        break
      case 3:
        cells[8] = 'o'
        ui.putO(8)
        break
    }
  }

  if (shouldPlay) {
    let randomNum = 0
    const generator = () => {
      randomNum = Math.floor(Math.random() * 9)
      if (cells[randomNum] === '') {
        cells[randomNum] = 'o'
        ui.putO(randomNum)
      } else {
        generator()
      }
    }
    generator()
  }
  $('.box').on('click', makeMove)
}

const botPlayEasy = () => {
  $('.box').off('click')
  let randomNum = 0
  const generator = () => {
    randomNum = Math.floor(Math.random() * 9)
    if (cells[randomNum] === '') {
      cells[randomNum] = 'o'
      ui.putO(randomNum)
    } else {
      generator()
    }
  }
  generator()
  $('.box').on('click', makeMove)
}

// Function to find winner
// (works during the game, when somebody wins, stops the game)
let isGameOver = false
const whoWon = function (id) {
  // Cell tracks that should contain 3 'x's or 'o's in a row to create winner
  const c = cells
  const winnerTracks = {
    track0: [c[0], c[1], c[2]],
    track1: [c[3], c[4], c[5]],
    track2: [c[6], c[7], c[8]],
    track3: [c[0], c[3], c[6]],
    track4: [c[1], c[4], c[7]],
    track5: [c[2], c[5], c[8]],
    track6: [c[0], c[4], c[8]],
    track7: [c[2], c[4], c[6]]
  }
  // Loop that iterates over winnerTracks object to find a winner
  for (const track in winnerTracks) {
    // Reduces winner tracks down to a string consist of "x"s and "o"s
    const trackValue = winnerTracks[track].reduce(isSame)
    const winner = winnerTracks[track][0][0]
    // if there is a match
    if (trackValue === 'xxx' || trackValue === 'ooo') {
      ui.onWinner(winner, track)
      isGameOver = true
      break
      /* If the last move was the winner move, break would end the condition here.
      If there was no break keyword, 2nd block would run and overwrite winner
      message in #message area */
    } else if (!cells.includes('')) {
      ui.onDraw()
      isGameOver = true
    }
  }
  // send updates to the api
  // This hidden button is being used to trigger update process of a game on api
  // Because circular require is not possible, this file cannot be required by
  // 'ui.js'. So, this button is created to send a data to 'ui.js' through
  // 'events.js'. I needed this because I wasn't able to invoke a function Here
  // from 'ui.js'.
  $('#send-to-api').trigger('click', [id, isGameOver])
}

module.exports = {
  makeMove,
  resetBoardHistory
}

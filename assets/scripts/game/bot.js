'use strict'

const ui = require('./ui')

// Array  that represents cells on the game board
let isWinner = false
let cells = ['', '', '', '', '', '', '', '', '']

const resetBoardHistory = () => {
  isWinner = false
  cells = ['', '', '', '', '', '', '', '', '']
}
const isVacant = (cell) => {
  return cell === ''
}

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
  // Condition to check if the box is empty and who was the last player?
  if (cells[id] !== '') {
    ui.alertPlayer()
    $('.box').on('click', (event) => { makeMove(event, level) })
  } else if (level === 'easy') {
    cells[id] = 'x'
    ui.putX(id, true)
    whoWon(id)
    if (!cells.some(isVacant)) {
      whoWon(id)
    } else {
      if (!isWinner) {
        $('.thinking').show()
      }
      setTimeout(() => {
        $('.thinking').fadeOut(200)
        botPlayEasy()
        whoWon(id)
      }, 2000)
    }
  } else {
    cells[id] = 'x'
    ui.putX(id, true)
    whoWon(id)
    if (!cells.some(isVacant)) {
      whoWon(id)
    } else {
      if (!isWinner) {
        $('.thinking').show()
      }
      setTimeout(() => {
        $('.thinking').fadeOut(200)
        botPlayHard()
        whoWon(id)
      }, 2000)
    }
  }
}

// AI BOT
const botPlayHard = () => {
  if (!isWinner) {
    let shouldPlay = true
    const tracksArr = []
    for (const track in winnerTracks) {
      tracksArr.push(winnerTracks[track].map(i => cells[i]).reduce(isSame))
    }
    // IF THERE IS TWO O IN SAME ROW, FILL THIRD CELL
    for (let i = 0; i < 8; i++) {
      if (shouldPlay && cells.some(isVacant)) {
        if (tracksArr[i] === 'oo') {
          const theTrack = winnerTracks['track' + i]
          for (let j = 0; j < 3; j++) {
            if (cells[theTrack[j]] === '') {
              cells[theTrack[j]] = 'o'
              ui.putO(theTrack[j], true)
              shouldPlay = false
            }
          }
        }
      }
    }
    // IF THERE IS TWO X IN A ROW, FILL THIRD ROW
    for (let i = 0; i < 8; i++) {
      if (shouldPlay && cells.some(isVacant)) {
        if (tracksArr[i] === 'xx') {
          const theTrack = winnerTracks['track' + i]
          for (let j = 0; j < 3; j++) {
            if (cells[theTrack[j]] === '') {
              cells[theTrack[j]] = 'o'
              ui.putO(theTrack[j], true)
              shouldPlay = false
            }
          }
        }
      }
    }

    // IF MIDDLE CELL IS VACANT PUT O
    if (cells[4] === '' && shouldPlay) {
      cells[4] = 'o'
      ui.putO(4, true)
      shouldPlay = false
    }

    // IF THERE IS O IN THE MIDDLE CELL PUT O ONE OF THE CELLS 1,3,5,7
    if (cells[4] === 'o' && shouldPlay && cells.some(isVacant)) {
      const possibleCells = [cells[1], cells[3], cells[5], cells[7]]
      const vacantCellIndex = []
      for (let i = 0; i < 4; i++) {
        if (possibleCells[i] === '') {
          vacantCellIndex.push(i)
        }
      }
      const randomNum = Math.floor(Math.random() * vacantCellIndex.length)
      switch (vacantCellIndex[randomNum]) {
        case 1:
          cells[1] = 'o'
          ui.putO(1, true)
          shouldPlay = false
          break
        case 3:
          cells[3] = 'o'
          ui.putO(3, true)
          shouldPlay = false
          break
        case 5:
          cells[5] = 'o'
          ui.putO(5, true)
          shouldPlay = false
          break
        case 7:
          cells[7] = 'o'
          ui.putO(7, true)
          shouldPlay = false
          break
        default:
          shouldPlay = true
      }
    }

    // IF MIDDLE CELL IS OCCUPIED PUT ON ANY OF VACANT CORNER CELLS
    if (cells[4] === 'x' && shouldPlay && cells.some(isVacant)) {
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
          ui.putO(0, true)
          shouldPlay = false
          break
        case 1:
          cells[2] = 'o'
          ui.putO(2, true)
          shouldPlay = false
          break
        case 2:
          cells[6] = 'o'
          ui.putO(6, true)
          shouldPlay = false
          break
        case 3:
          cells[8] = 'o'
          ui.putO(8, true)
          shouldPlay = false
          break
        default:
          shouldPlay = true
      }
    }

    if (shouldPlay && cells.some(isVacant)) {
      let randomNum = 0
      const generator = () => {
        randomNum = Math.floor(Math.random() * 9)
        if (cells[randomNum] === '') {
          cells[randomNum] = 'o'
          ui.putO(randomNum, true)
        } else {
          generator()
        }
      }
      generator()
    }
    $('.box').on('click', (event) => { makeMove(event, 'hard') })
  }
}

const botPlayEasy = () => {
  if (!isWinner) {
    $('.box').off('click')
    let randomNum = 0
    const generator = () => {
      randomNum = Math.floor(Math.random() * 9)
      if (cells[randomNum] === '') {
        cells[randomNum] = 'o'
        ui.putO(randomNum, true)
      } else {
        generator()
      }
    }
    generator()
    $('.box').on('click', (event) => { makeMove(event, 'easy') })
  }
}

// Function to find winner
// (works during the game, when somebody wins, stops the game)

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
      // 3rd parameter show this is a bot game
      isWinner = true
      ui.onWinner(winner, track, true)
      break
      /* If the last move was the winner move, break would end the condition here.
      If there was no break keyword, 2nd block would run and overwrite winner
      message in #message area */
    } else if (!cells.includes('')) {
      // parameter show this is a bot game
      ui.onDraw(true)
    }
  }
}

module.exports = {
  makeMove,
  resetBoardHistory
}

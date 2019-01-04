const cells = ['', '', '', '', '', '', '', '', '', '']
let lastPlayer = null

const makeMove = function (event) {
  const id = event.target.id
  if (cells[id] !== '') {
    alert('play on another cell')
  } else if (lastPlayer === 'o' || lastPlayer === null) {
    cells[id] = 'x'
    lastPlayer = 'x'
    $('#' + id).text('x')
  } else {
    cells[id] = 'o'
    lastPlayer = 'o'
    $('#' + id).text('o')
  }
}

module.exports = {
  makeMove
}

'use strict'

const views = require('./views.js')

const xChar = '\u2715'
const oChar = '\u3007'
const turns = new Array(9)
let turn = 0
let player = 'x'
const cues = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const initGame = function () {
  console.log('initGame')

  turns.fill('')
  turn = 0
  player = 'x'

  views.message('player ' + player + '\'s turn')
}

const chooseSquare = function (evt) {
  const sqNum = $(this).data('id')
  turns[sqNum] = player.toLowerCase()
  updateSquare(this)

  const status = gameStatus()
  console.log('chooseSquare(): status = ', status)

  if (status === 0) {
    turn++
    togglePlayer()
  } else {
    // game over
    views.gameOverView()
    // disable all buttons remaining
    // views.message('game over')
    views.message('player ' + player.toUpperCase() + ' wins')
  }
}

const updateSquare = function (sqObj) {
  // set char
  if (player === 'x') {
    $(sqObj).closest('.square').html(xChar)
  } else {
    $(sqObj).closest('.square').html(oChar)
  }
}

const togglePlayer = function () {
  if (player === 'x') {
    player = 'o'
  } else {
    player = 'x'
  }
  views.message('player ' + player.toUpperCase() + '\'s turn')
}

const checkCue = function (cue) {
  if (turns[cue[0]] === turns[cue[1]] && turns[cue[0]] === turns[cue[2]] && turns[cue[1]] === turns[cue[2]]
  ) {
    // all three are the same (return 1 for 'X', -1 for 'O', or 0 for tie)
    if (turns[cue[0]]) {
      if (turns[cue[0]] === 'x') {
        return 'x'
      } else {
        return 'o'
      }
    }
  } else {
    return 0
  }
}

const gameStatus = function () {
  for (let i = 0; i < cues.length; i++) {
    const winner = checkCue(cues[i])
    if (winner) {
      // console.log('gameStatus(): winner = ', winner)
      return winner
    }
  }
  return 0
}

module.exports = {
  initGame,
  chooseSquare
}

'use strict'
const api = require('./auth/api')
const ui = require('./auth/ui')
// const store = require('./store.js')

const views = require('./views.js')

const xChar = '\u2715'
const oChar = '\u3007'
const moves = new Array(9)
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

  moves.fill('')
  turn = 0
  player = 'x'

  views.message('player ' + player + '\'s turn')
}

const chooseSquare = function (evt) {
  const sqNum = $(this).data('id')
  moves[sqNum] = player.toLowerCase()
  updateSquare(this)
  console.log('turn ', turn)
  const status = gameStatus()
  console.log('chooseSquare(): status = ', status)
  let over = false

  if (status === 0 && turn < 8) {
    turn++
    togglePlayer()
    // over = false
  } else {
    // game over
    views.gameOverView()
    over = true

    // disable all buttons remaining
    disableEmptySquares()

    if (status !== 0) {
      views.message('player ' + player.toUpperCase() + ' wins')
    } else {
      views.message('tie game')
    }
  }

  const data = {
    'game': {
      'cell': {
        'index': sqNum,
        'value': player
      },
      'over': over
    }
  }

  api.updateGame(data)
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)

  // store.game = null
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
  if (
    moves[cue[0]] === moves[cue[1]] &&
    moves[cue[0]] === moves[cue[2]] &&
    moves[cue[1]] === moves[cue[2]]
  ) {
    // all three are the same (return 1 for 'X', -1 for 'O', or 0 for tie)
    if (moves[cue[0]]) {
      if (moves[cue[0]] === 'x') {
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

const disableEmptySquares = function () {
  // find empty values in turns[]

  for (let i = 0; i < moves.length; i++) {
    if (moves[i] !== '') {
      // get square divs with data-id = i
      // $('[data-id="' + i + '"]').html('')
      $('.play-btn[data-id]').closest('.square').html('')
    }
  }
}

module.exports = {
  initGame,
  chooseSquare
}

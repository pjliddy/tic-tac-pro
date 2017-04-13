'use strict'
const api = require('./auth/api')
const ui = require('./auth/ui')
const views = require('./views.js')

// map unicode chars with better shapes for X and O
const xChar = '\u2715'
const oChar = '\u3007'

// define game variables
const moves = new Array(9)
let turn = 0
let player = 'x'
let over = false

// define "cues" to check for win state
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

// initGame()
// initialize game engine

const initGame = function () {
  moves.fill('')
  turn = 0
  player = 'x'
  views.message('player ' + player + '\'s turn')
}

// chooseSquare()
// handle user's choice of square in the game

const chooseSquare = function (evt) {
  // get which square the player clicked on
  const sqNum = $(this).data('id')
  // store the move in the moves array
  moves[sqNum] = player.toLowerCase()
  // update game and UI
  updateSquare(this)
  // determine if game is over
  const status = gameStatus()
  // set over flag for update API call
  if (!status) {
    over = status
  } else {
    over = true
  }
  // set values of data object for update API call
  const data = {
    'game': {
      'cell': {
        'index': sqNum,
        'value': player
      },
      'over': false
    }
  }

  // TO DO: IMPROVE FLOW OF THIS CODE:
  //  1. handle turn
  //  2. evaluate game
  //  3. update indexes
  //  4. dispay result

  // if game is not over yet
  if (status === 0 && turn < 8) {
    // save move with API
    api.updateGame(data)
      .then(ui.updateGameSuccess)
      .catch(ui.updateGameFailure)

    // update turn and player
    turn++
    togglePlayer()
  } else {
    // game over, man!
    over = true
    data.game.over = over
    views.onGameOverView()

    api.updateGame(data)
      .then(ui.updateGameSuccess)
      .catch(ui.updateGameFailure)

    // disable all buttons remaining
    disableEmptySquares()

    if (status !== 0) {
      views.message('player ' + player.toUpperCase() + ' won')
      // if player 'x' won
      if (player === 'x') {
        // get player's game tally from the API
        api.getIndex(data)
          .then(ui.getIndexSuccess)
          .catch(ui.getIndexFailure)
      }
    } else {
      // update message to player in UI
      views.message('tie game')
    }
  }
}

// updateSquare()
// update UI based on user's choice of square

const updateSquare = function (sqObj) {
  // set char on the board to the right symbol for current player
  let playerChar

  if (player === 'x') {
    playerChar = xChar
  } else {
    playerChar = oChar
  }

  // apply jQuery cross fade to content change
  $(sqObj).fadeOut(100, function () {
    $(sqObj).closest('.square').html(playerChar).fadeIn(100)
  })
}

// togglePlayer()
// swith between 'x' and 'o' player for next turn

const togglePlayer = function () {
  if (player === 'x') {
    player = 'o'
  } else {
    player = 'x'
  }
  // update message to player in UI
  views.message('player ' + player.toUpperCase() + '\'s turn')
}

// checkCue()
// checks a "cue" of three squares to see if they indicate a winning condition

const checkCue = function (cue) {
  // see if all three squares are the same
  if (
    moves[cue[0]] === moves[cue[1]] &&
    moves[cue[0]] === moves[cue[2]] &&
    moves[cue[1]] === moves[cue[2]]
  ) {
    // if the content of the squares in the cue is not blank
    if (moves[cue[0]]) {
      // all three are the same (return 'x', 'o', or 0 for tie)
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

// gameStatus()
// checks all cues and returns "x" or "o" if there's a winner or 0 for a tie

const gameStatus = function () {
  for (let i = 0; i < cues.length; i++) {
    const winner = checkCue(cues[i])
    if (winner) {
      return winner
    }
  }
  return 0
}

// disableEmptySquares()
// when the game is over, remove any remaing buttons from board squares

const disableEmptySquares = function () {
  // find empty values in turns[]
  for (let i = 0; i < moves.length; i++) {
    if (moves[i] !== '') {
      // clear the content of squares that still have buttons
      // apply jQuery cross fade to content change
      $('.play-btn[data-id]').fadeOut(100, function () {
        $('.play-btn[data-id]').closest('.square').html('').fadeIn(100)
      })
    }
  }
}

module.exports = {
  initGame,
  chooseSquare
}

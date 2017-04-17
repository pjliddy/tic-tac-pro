'use strict'
const api = require('./auth/api')
const ui = require('./auth/ui')
const view = require('./view.js')
const ai = require('./ai.js')

// map unicode chars with better shapes for X and O
const xChar = '\u2715'
const oChar = '\u3007'

// define game variables
const moves = new Array(9)
let turn = 0
let player = 'x'
let over = false
// define AI variables
let turns = new Array(0)
let options = [0, 1, 2, 3, 4, 5, 6, 7, 8]

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

  // AI variables
  turns = []
  options = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  view.message('player ' + player + '\'s turn')
}

// chooseSquare()
// handle user's choice of square in the game

const chooseSquare = function (evt) {
  // get which square the player clicked on
  const sqNum = $(this).data('id')
  // add sqNum to turns for AI
  turns.push(sqNum)
  const index = options.indexOf(sqNum)
  options.splice(index, 1)

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

  // if game is not over yet
  if (status === 0 && turn < 8) {
    // save move with API
    api.updateGame(data)
      .then(ui.updateGameSuccess)
      .catch(ui.updateGameFailure)

    // update turn and player
    turn++
    togglePlayer()

    if (turns.length >= 3) {
      // if (player === 'o') {
        // get ai's choice of best next move
      // timer to test performance
      const startTime = Date.now()
      console.log(`thinking...`)

      const decideObj = ai.decide(turns.join(''))

      const endTime = (Date.now() - startTime) / 1000 + ' sec'
      console.log(`duration: ${endTime}`)

      console.log(`MOVE: ${decideObj.uid.slice(-1)} | score: ${decideObj.score}`)
    }
    // }
  } else {
    // game over, man!
    over = true
    data.game.over = over
    view.onGameOverView()
    // disable all buttons remaining
    disableEmptySquares()

    api.updateGame(data)
      .then(ui.updateGameSuccess)
      // don't try to get index until update is successful
      .then(function () {
        if (status !== 0) {
          view.message('player ' + player.toUpperCase() + ' won')
          // if player 'x' won
          if (player === 'x') {
            // get player's game tally from the API
            api.getIndex(data)
              .then(ui.getIndexSuccess)
              .catch(ui.getIndexFailure)
          }
        } else {
          // update message to player in UI
          view.message('tie game')
        }
      })
      .catch(ui.updateGameFailure)
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
  view.message('player ' + player.toUpperCase() + '\'s turn')
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
    // clear the content of squares that still have buttons
    if (moves[i] !== '') {
      // apply jQuery cross fade to content change
      $('.play-btn[data-id]').fadeOut(100, function () {
        $('.play-btn[data-id]').closest('.square').html('').fadeIn(100)
      })
    }
  }
}

module.exports = {
  initGame,
  chooseSquare,
  gameStatus
}

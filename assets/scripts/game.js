'use strict'
const api = require('./auth/api')
const ui = require('./auth/ui')
const views = require('./views.js')
const Boards = require('./board.js')

// define game variables
const moves = new Array(9)
let turn
let player
let over
let board

// initGame()
// initialize game engine

const initGame = function () {
  board = new Boards.Board()
  moves.fill('')
  turn = 0
  player = 'x'
  over = false
  views.message('player ' + player.toUpperCase() + '\'s turn')
}

// chooseSquare()
// handle user's choice of square in the game

const chooseSquare = function (evt) {
  // play sound effect
  views.beep()
  // get which square the player clicked on
  const sqNum = $(this).data('id')
  // store the move in the moves array
  moves[sqNum] = player.toLowerCase()
  // send player move to board
  board.select(sqNum, player)
  // determine if game is over
  const status = board.status()

  // set over flag for update API call
  over = status

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
  if (!over && turn < 8) {
    // update turn and player
    togglePlayer()

    // save move with API
    api.updateGame(data)
      .then(ui.updateGameSuccess)
      .catch(ui.updateGameFailure)
  } else {
    // game over, man!
    over = true
    data.game.over = over
    views.onGameOverView()
    // disable all buttons remaining
    board.clear()

    api.updateGame(data)
      .then(ui.updateGameSuccess)
      // don't try to get index until update is successful
      .then(function () {
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
      })
      .catch(ui.updateGameFailure)
  }
}

// togglePlayer()
// swith between 'x' and 'o' player for next turn

const togglePlayer = function () {
  turn++
  player = (player === 'x') ? 'o' : 'x'

  // update message to player in UI
  views.message('player ' + player.toUpperCase() + '\'s turn')

  return player
}

module.exports = {
  initGame,
  chooseSquare
}

'use strict'

const views = require('./views.js')

const xChar = '\u2715'
const oChar = '\u3007'
const turns = new Array(9)
let turn = 0
let player = 'X'

const initGame = function () {
  console.log('initGame')

  turns.fill('')
  turn = 0
  player = 'X'

  views.message('player ' + player + '\'s turn')
}

const chooseSquare = function (evt) {
  const sqNum = $(this).data('id')
  turns[sqNum] = player.toLowerCase()
  updateSquare(this)
  turn++
  togglePlayer()

  if (gameOver()) {
    views.gameOverView()
  }
}

const updateSquare = function (sqObj) {
  // set char
  if (player === 'X') {
    $(sqObj).closest('.square').html(xChar)
  } else {
    $(sqObj).closest('.square').html(oChar)
  }
}

const togglePlayer = function () {
  if (player === 'X') {
    player = 'O'
  } else {
    player = 'X'
  }
  views.message('player ' + player + '\'s turn')
}

const gameOver = function () {
  if (turn === 9) {
    return true
  } else {
    return false
  }
}
module.exports = {
  initGame,
  chooseSquare
}

'use strict'

const NUM_SQUARES = 9
const squares = new Array(NUM_SQUARES).fill('')
const cues = []

//  Board Object Prototype:
//    Represents the game board

const Board = function () {
  // initialze squares
  this.numSquares = 9
  this.squares = new Array(this.numSquares).fill('')
  this.cues = []

  const Squares = require('./square.js')

  // create 9 square objects
  this.squares.forEach((e, i, a) => {
    const square = new Squares.Square($('.grid .square')[i])
    this.squares[i] = square
  })

  // create cues made of squares
  const trios = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  const Cues = require('./cue.js')

  trios.forEach((e, i, a) => {
    const squares = [this.squares[e[0]], this.squares[e[1]], this.squares[e[2]]]
    const cue = new Cues.Cue(squares)
    cues[i] = cue
  })

  return squares.length
}

// status()
// checks all cues and returns "x" or "o" if there's a winner or 0 for a tie

Board.prototype.status = function () {
  const result = null

  for (const cue in cues) {
    const result = cues[cue].status()
    if (result) {
      return result
    }
  }
  return result
}

Board.prototype.select = function (sqNum, player) {
  this.squares[sqNum].select(player)
}

module.exports = {
  Board
}

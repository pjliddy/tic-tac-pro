'use strict'

//  Board Object
//    Represents the game board

const Board = function () {
  // initialze board variables
  this.squares = new Array(9).fill('')
  this.cues = []

  // define a Square object
  const Squares = require('./square.js')
  // create 9 square objects
  this.squares.forEach((e, i, a) => {
    this.squares[i] = new Squares.Square($('.grid .square')[i])
  })

  // create cues made of squares
  const trios = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  // define a Cue object
  const Cues = require('./cue.js')
  // create 8 Cue objects
  trios.forEach((e, i, a) => {
    const cue = new Cues.Cue(
      [this.squares[e[0]], this.squares[e[1]], this.squares[e[2]]]
    )
    this.cues.push(cue)
  })

  return this.squares.length
}

// Board.status()
//   checks all cues and
//   returns "1" (x) or "-1" (o) for a winner or "0" for a tie

Board.prototype.status = function () {
  const result = null

  for (const cue in this.cues) {
    const result = this.cues[cue].status()
    if (result) {
      return result
    }
  }
  return result
}

//  Board.select()
//    Board selects one of its squares by telling the square to select itself

Board.prototype.select = function (sqNum, player) {
  this.squares[sqNum].select(player)
}

// Board.clear()
//    Clear any active buttons from board squares when the game is over

Board.prototype.clear = function () {
  // create 9 square objects
  this.squares.forEach(square => {
    if (square.value === null) {
      square.clear()
    }
  })
}

module.exports = {
  Board
}

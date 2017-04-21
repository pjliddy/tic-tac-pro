'use strict'

//  Cue Object
//    Represents a series squares on the board (rows, columns, or diagonals)
//    that, when filled, win the game

let squares = new Array(3)

//  Cue.init()
//    Assign squares to the Cue object

const init = function (sqArray) {
  // s1, s2, and s3 are square objects
  squares = sqArray
  return squares.length
}

//  Cue.won()
//    Cue checks if values of its squares match and returns the winner
//    ('X' or 'O') or false

//  NOTE: Squares should announce they've changed and cues should
//  check themselves if one of their squares updates, rather than
//  the board always checking. The cue should yell "Bingo!"

const won = function () {
  if (this.squares[0].value === this.squares[1].value &&
    this.squares[0].value === this.squares[2].value &&
    this.squares[1].value === this.squares[2].value &&
    this.squares[0].value) {
    // all three are the same (return 1 for 'x', -1 for 'o', or 0 for tie)
    if (this.squares[0].value === 'x') {
      return 1
    } else {
      return -1
    }
  } else {
    return 0
  }
}

module.exports = {
  init,
  won
}

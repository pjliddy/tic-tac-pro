'use strict'

//  Cue Object
//    Represents a series squares on the board (rows, columns, or diagonals)
//    that, when filled with identical values, indicate a win

const Cue = function (squares) {
  // s1, s2, and s3 are three square objects
  this.squares = squares

  return this.squares.length
}

//  Cue.won()
//    Cue checks if values of its squares match and
//    returns the winner ('X' or 'O') or false

Cue.prototype.status = function () {
  // if all three are the same (real) value
  if (this.squares[0].value === this.squares[1].value &&
      this.squares[0].value === this.squares[2].value &&
      this.squares[1].value === this.squares[2].value &&
      this.squares[0].value) {
    // (return 1 for 'x', -1 for 'o', or 0 for tie)
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
  Cue
}

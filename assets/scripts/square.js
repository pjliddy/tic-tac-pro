'use strict'

// unicode symbols for more geometric 'x' and 'o' char

const X_CHAR = '\u2715'
const O_CHAR = '\u3007'

// Square Object
//    Represents individual squares on the board

const Square = function (div) {
  // value = null (default) | 'X' | 'O'
  this.value = null
  // wrapper = html div for square
  this.wrapper = div

  return this.value
}

//  Square.reset()
//    Returns the square object to its default state

Square.prototype.reset = function () {
  this.value = null
  return this.value
}

//  Square.render(player)
//    Update display properties for a player move

Square.prototype.render = function (player) {
  // update UI when there is one
  let playerChar

  if (player === 'x') {
    playerChar = X_CHAR
  } else {
    playerChar = O_CHAR
  }

  // apply jQuery cross fade to content change
  $(this.wrapper).html(playerChar).fadeIn(150)
}

//  Square.select(player)
//    Sets its value to 'x' or 'o' when selected

Square.prototype.select = function (player) {
  this.value = player
  this.render(player)
  return this.value
}

Square.prototype.lock = function () {
  $(this.wrapper).html('')
}

module.exports = {
  Square
}

'use strict'

// unicode symbols for more geometric 'x' and 'o' char

const X_CHAR = '\u2715'
const O_CHAR = '\u3007'

// Square Object
//    Represents individual squares on the board

const Square = function (div) {
  // value = null (default) | 'X' | 'O'
  this.value = null

  // view object to handle render updates
  const Views = require('./view.js')
  this.wrapper = new Views.View(div)

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

  this.wrapper.renderFadeIn(playerChar, 150)
}

//  Square.select(player)
//    Sets its value to 'x' or 'o' when selected

Square.prototype.select = function (player) {
  this.value = player
  this.render(player)
  return this.value
}

//  Square.clear()
//    Clear active button from board square when the game is over

Square.prototype.clear = function () {
  this.wrapper.clear()
  // $(this.wrapper).html('')
}

module.exports = {
  Square
}

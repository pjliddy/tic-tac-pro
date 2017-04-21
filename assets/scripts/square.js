'use strict'

//  Square Object
//    Represents individual squares on the board

const xChar = '\u2715'
const oChar = '\u3007'

// this.value = null (default) | 'X' | 'O'
let value = null
// element = html div for square
let element = null

//  Square.init()
//    Set the square object to its default state

const init = function (div) {
  element = div
  return reset()
}

//  Square.reset()
//    Returns the square object to its default state

const reset = function () {
  value = null
  return this.value
}

//  Square.render()
//    Update display properties for a square object

const render = function () {
  // update UI when there is one
  if (value === null) {
    return '[ ]'
  } else {
    return '[' + value + ']'
  }
}

//  Square.select(player)
//    Sets its value to 'x' or 'o' when selected

const select = function (player) {
  value = player
  return value
}

module.exports = {
  init,
  reset,
  render,
  select
}

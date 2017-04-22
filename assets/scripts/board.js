'use strict'

const NUM_SQUARES = 9
const squares = new Array(NUM_SQUARES).fill('')
const cues = []

const init = function () {
  // create 9 square objects
  squares.forEach((e, i, a) => {
    const square = require('./square.js')
    squares[i] = square
  })

  // create cues with squares

  const trios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  trios.forEach((e, i, a) => {
    const cue = require('./cue.js')
    cue.init(e)
    cues[i] = cue
  })

  return squares.length
}

const won = function () {
  const result = null

  return result
}

module.exports = {
  init,
  won
}

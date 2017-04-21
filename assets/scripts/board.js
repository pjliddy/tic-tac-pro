'use strict'

const squares = new Array(9)
const cues = new Array(8)

const init = function () {
  // create 9 square objects
  squares.forEach(square => {
    square = require('./square.js')
    squares.push(square)
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

  trios.forEach(trio => {
    const cue = require('./cue.js')
    cue.init(trio)
    cues.push(cue)
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

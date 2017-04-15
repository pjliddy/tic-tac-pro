'use strict'

/*
 *  tic tac pro AI
 *
 *  1. The player is always "x"; the AI is always "o"
 *  2. The AI always pursues the worst possible outcome for the player
 *  3. Winning in fewer moves is considered a better outcome for the AI
*/

// only require files used
// const api = require('./auth/api')
// const ui = require('./auth/ui')
// const view = require('./view.js')
// const game = require('./game.js')
const games = []
const scores = []

//  swap(array, index1, index2)
//    utilitiy function to swap the values in two positions of an array
//    used in Heap's permutation algorithm

const swap = function (array, idx1, idx2) {
  const temp = array[idx1]
  array[idx1] = array[idx2]
  array[idx2] = temp
}

//  heapsPermute(array, output, n)
//    Generates a Heaps Permutation (every possible unique combination)
//    of an array of numbers, in this case, the 9 squares of the board.

//    Source: Heap's Permutation Algorithm in Javascript
//    http://dsernst.com/2014/12/14/heaps-permutation-algorithm-in-javascript/

const heapsPermute = function (array, output, n) {
  // set n default to array.length
  n = n || array.length
  if (n === 1) {
    output(array)
  } else {
    for (let i = 1; i <= n; i += 1) {
      heapsPermute(array, output, n - 1)
      let j
      if (n % 2) {
        j = 1
      } else {
        j = i
      }
      // -1 to account for javascript zero-indexing
      swap(array, j - 1, n - 1)
    }
  }
}

//  getWin()
//    checks if values of cue squares match and returns
//    1 for 'x', -1 for 'o', 0 for a tie

const checkWin = function (board) {
  const cues = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const cue of cues) {
    // all three are the same
    if (
      board[cue[0]] === board[cue[1]] &&
      board[cue[1]] === board[cue[2]] &&
      board[cue[2]] === board[cue[0]]
    ) {
      // return 1 for 'x', -1 for 'o'
      if (board[cue[0]] === 'x') {
        return 1
      } else if (board[cue[0]] === 'o') {
        return -1
      }
    }
  }
  // return 0 for tie
  return 0
}

//  getScore()
//    Runs a game with the specified sequence of squares
//    score = 5 - 0 turns * result (+1 or -1 or 0)

const getScore = function (options) {
  const board = new Array(9)
  let turn = 0
  let result = 0

  for (let i = 0; i < options.length; i++) {
    const squareNum = options[i]

    board[squareNum] = (i % 2) ? 'o' : 'x'
    // if (i % 2) {
    //   board[squareNum] = 'o'
    // } else {
    //   board[squareNum] = 'x'
    // }

    // only check if at least one player has moved 3 times
    // and a winner hasn't been found yet
    if (i >= 5 && result === 0) {
      result = checkWin(board)
      turn = i
    }
  }

  return {
    'turn': turn,
    'score': (5 - Math.round(turn / 2)) * result
  }
}

// initAi()
//  initialize the game AI

const initAi = function () {
  // temporary timer to test performance
  const startTime = Date.now()
  // array of move options
  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // initialize games array
  this.games = []
  this.scores = []
  // store this in a reference for iteration of array
  const that = this

  // STEP 1: CREATE ARRAY OF ALL POSSIBLE UIDS BY
  // GENERATING A HEAP'S PERMUTATION OF 9 SQUARE CHOICES

  heapsPermute(options, function (input) {
    that.games.push(input.join(''))
  })

  // STEP 2: SORT UIDS IN ASCENDING ORDER SO TURN LIST CAN BE USED
  // AS FILTER MASKS

  this.games.sort()

  // STEP 3: EVALUATE EACH GAME UID FOR X, O, OR TIE
  // IF GAME TAKES FEWER THAN 9 TURNS, REMOVE ANY TURNS FROM GAME ARRAY THAT
  // BEGIN WITH THE TURN LIST AS A FILTER MASK

  for (let i = 0; i < this.games.length; i++) {
    const scoreData = getScore(this.games[i])
    let uid = that.games[i]

    if (scoreData.turn < 8) {
      // delete any others with this mask
      const mask = uid.slice(0, scoreData.turn + 1)
      // get guids that begin with this mask

      // skip over any other uids that start with the mask
      if (uid.startsWith(mask)) {
        i++
      }

      uid = mask
    }

    that.scores.push({
      [uid]: scoreData.score
    })

    // if (i % 10000 === 0) {
    //   console.log(uid, scoreData.score)
    // }
  }

  const initTime = (Date.now() - startTime) / 1000 + ' sec'
  console.log(`Unique Combinations: ${that.scores.length} - ${initTime}`)

  return initTime
}

module.exports = {
  initAi
}

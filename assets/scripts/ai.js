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

const game = require('./game.js')

const games = []

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

//  getScore()
//    Runs a game with the specified sequence of squares
//    Returns: 1 for a win, -1 for a loss, 0 for a tie

//    NOTE: should score based on number of 'O' turns;
//    A better outcome is one in which 'O' wins in fewer turns

const getScore = function (options) {
  // should be able to take array or string
  if (!Array.isArray(options)) {
    options = options.split('')
  }
  const board = new Array(9)
  let turns = 0
  let result = 0

  for (let i = 0; i < options.length; i++) {
    const squareNum = options[i]

    if (i % 2) {
      board[squareNum] = 'o'
    } else {
      board[squareNum] = 'x'
    }
    if (i > 4 && result === 0) {
      // result = this.checkWin()
      // result = game.gameStatus()

      // FIND OUT IF THEY WIN here
      // for temp return count
      turns = i
      result = i
    }
  }
  return {'uid': options.join(''), 'turns': turns, 'score': result}
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

  debugger

  for (let i = 0; i < this.games.length; i++) {
  // this.games.forEach(function (uid) {
    const gameData = getScore(this.games[i])
    that.games[i] = gameData

    if (i % 10000 === 0) {
      console.log(gameData.uid, gameData.score)
    }
  }

  // console.log(`${that.games.length} games`)
  return ((Date.now() - startTime) / 1000 + ' sec')
}

module.exports = {
  initAi
}

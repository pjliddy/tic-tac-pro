'use strict'

/*
 *  tic tac pro AI
 *
 *  1. The player is always "x"; the AI is always "o"
 *  2. The AI always pursues the worst possible outcome for the player
 *  3. Winning in fewer moves is considered a better outcome for the AI
*/

let scores = []
let games = []

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

//  checkWin()
//    checks if values of cue squares match and
//    returns 1 for 'x', -1 for 'o', 0 for a tie

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

// getOptions(mask)
//  returns an array of available squares not used by mask

const getOptions = function (mask) {
  const options = []
  for (let i = 0; i < 9; i++) {
    if (mask.indexOf(i) === -1) {
      options.push(i)
    }
  }
  return options
}

// findScore(mask)
//  returns a score object that exactly matches mask or undefined

const findScore = function (mask) {
  const result = scores.find(
    (element) => element.uid === mask
  )
  return result
}

//  scoreGame()
//    Runs a game with the specified sequence of squares
//    score = 5 - number of turns 'o' has taken * checkWin() (+1 or -1 or 0)

const scoreGame = function (options) {
  // if (options.startsWith('0123456')) {
  //   debugger
  // }

  const board = new Array(9)
  let turn = 1
  let result = 0

  for (let i = 0; i < options.length; i++) {
    const squareNum = options[i]
    board[squareNum] = (i % 2) ? 'o' : 'x'

    // only check if at least one player has moved 3 times
    // and a winner hasn't been found yet
    if (i >= 4 && result === 0) {
      result = checkWin(board)
      turn = i + 1
      if (result) {
        break
      }
    }
  }

  return {
    'turn': turn,
    'score': 5 - Math.trunc(turn / 2) * result
  }
}

const unMaskGamesList = function (mask) {
  games.filter(
    (element) => !element.startsWith(mask)
  )
}

// initAi()
//  initialize the game AI

const initAi = function () {
  const temp = []
  // timer to test performance
  const startTime = Date.now()
  // array of possible move options
  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // initialize games array
  games = []
  // initialize scores array
  scores = []
  // store this in a reference for iteration of array
  const thoseGames = games
  // create an array of all possible uids by generating
  // a Heap's permutation of 9 move options
  heapsPermute(options, function (input) {
    thoseGames.push(input.join(''))
  })
  // sort uids in ascending order to facilitate filtering out
  // games that end in less than 9 moves
  games.sort()
  games.reverse()

  // create a score data object for each possible permutation of moves
  //  {
  //    'turn': <last turn in game>
  //    'score': [-2, -1, 0, 1, or 2]
  //  }

  // const numGames = games.length
  // console.log(games.length)
  while (games.length > 0) {
    // pull last (lowest) uid off of list
    let uid = games.pop()
    const scoreData = scoreGame(uid)

    // if (uid.startsWith('03142')) {
    //   debugger
    // }

    // if the game takes less than 9 turns
    if (scoreData.turn < 8) {
      // skip over any other uids that start with the mask
      const mask = uid.slice(0, scoreData.turn + 1)

      // use shorter mask for uid since it would be the last
      // possible permutation with those moves
      // NOTE: writes multiple; needs optimization

      uid = mask
      while (games[games.length - 1].startsWith(mask)) {
        games.pop()
      }
    }

    // game is over
    // store a score object for each terminal state permutation
    // if there's one already, don't push

    if (findScore(uid) === undefined) {
      scores.push({
        'uid': uid,
        'score': scoreData.score
      })
    }
  }

  const initTime = (Date.now() - startTime) / 1000 + ' sec'
  console.log(`Init AI w/${scores.length} scores - ${initTime}`)

  return initTime
}

const getScoreObjs = function (mask) {
  const result = scores.filter(
    (element) => element.uid.startsWith(mask)
  )
  return result
}

const getMin = function (array) {
  const result = array.reduce(
    (acc, c) => (c.score < acc.score) ? c : acc
  )
  console.log(`getMin: ${result.uid}`)
  return result
}

const getMax = function (array) {
  const result = array.reduce(
    (acc, c) => (c.score > acc.score) ? c : acc
  )
  console.log(`getMax: ${result.uid}`)
  return result
}

// decide(mask)
//  makes best choice for player

const decide = function (mask) {
  // options can be derived from mask & don't need to be passed in
  const options = getOptions(mask)
  let isAi // don't need both

  // see if there's a score object with that mask
  let scoreObj = findScore(mask)

  // if this is a terminal state (mask has a score)
  if (scoreObj !== undefined) {
    // console.log(`return ${scoreObj.uid}: ${scoreObj.score}`)
    return scoreObj
  } else {  // else calculate minmax
    // create empty scoreObj
    scoreObj = {}
    // determine player for next turn with this mask
    if ((mask.length + 1) % 2) {
      // player = 'x'; player turn = max
      isAi = false
      // initialize max score
      scoreObj.score = -10
    } else {
      // player = 'o'; ai turn = min
      isAi = true
      // initialize min score
      scoreObj.score = 10
    }

    // iterate through options
    options.forEach(function (option) {
      // add option to mask
      const nextMask = mask + option
      // recursively call minMax on nextMask to test vs. current score
      const nextScoreObj = decide(nextMask)

      // if nextScore beats saved score replace saved score
      // (min or max, depending on turn)
      if (isAi) {
        // min: if next score is less than stored score, replace it
        if (nextScoreObj.score < scoreObj.score) {
          // if next score is less than stored score, replace it
          // if (nextScoreObj.uid.startsWith('0314')) {
          //   debugger
          // }
          scoreObj = nextScoreObj
        }
      } else {
        // max: if next score is greater than than stored score, replace it
        if (nextScoreObj.score > scoreObj.score) {
          // if (nextScoreObj.uid.startsWith('0314')) {
          //   debugger
          // }
          scoreObj = nextScoreObj
        }
      }
    })
  }

  // const choice = scoreObj.uid.slice(-1)
  // score = scoreObj.score
  // console.log(`choice: ${scoreObj.uid.slice(-1)}; score: ${scoreObj.score}`)

  return scoreObj
}

module.exports = {
  initAi,
  decide
}

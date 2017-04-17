'use strict'

/*
 *  tic tac pro AI
 *
 *  1. The player is always "x"; the AI is always "o"
 *  2. The AI always pursues the worst possible outcome for the player
 *  3. Winning in fewer moves is considered a better outcome for the AI
*/

let scores = []

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

//  scoreGame()
//    Runs a game with the specified sequence of squares
//    score = 5 - number of turns 'o' has taken * checkWin() (+1 or -1 or 0)

const scoreGame = function (options) {
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
  // timer to test performance
  const startTime = Date.now()
  // array of possible move options
  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // initialize games array
  const games = []
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

  // create a score data object for each possible permutation of moves
  //  {
  //    'turn': <last turn in game>
  //    'score': [-2, -1, 0, 1, or 2]
  //  }

  for (let i = 0; i < games.length; i++) {
    const scoreData = scoreGame(games[i])
    let uid = games[i]

    // if the game takes less than 9 turns
    if (scoreData.turn < 8) {
      // skip over any other uids that start with the mask
      const mask = uid.slice(0, scoreData.turn + 1)

      // use shorter mask for uid since it would be the last
      // possible permutation with those moves
      // NOTE: writes multiple; needs optimization

      uid = mask
    }

    // game is over
    // store a score object for each terminal state permutation
    // if there's one already, don't push

    scores.push({
      'uid': uid,
      'score': scoreData.score
    })

    // if (uid.startsWith('031462')) {
    //   console.log(`uid:  ${uid} = ${scoreData.score}`)
    // }
  }

  const initTime = (Date.now() - startTime) / 1000 + ' sec'
  console.log(`Unique Combinations: ${scores.length} - ${initTime}`)

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
    scoreObj = {}
    // determine player for next turn with this mask
    if ((mask.length + 1) % 2) {
      // player turn = max
      // player = 'x'
      isAi = false
      // initialize max score
      scoreObj.score = -10
    } else {
      // ai turn = min
      // player = 'o'
      isAi = true
      // initialize min score
      scoreObj.score = 10
    }

    // debugger

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
          scoreObj = nextScoreObj
        }
      } else {
        // max: if next score is greater than than stored score, replace it
        if (nextScoreObj.score > scoreObj.score) {
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

  // declare minmax flag (make boolean isMin?)
  // let isMin = true
  //
  // // min' for ai, 'max' for player
  // if ((mask.length + 1) % 2) {
  //   // player turn
  //   isMin = false
  // } else {
  //   // ai turn
  //   isMin = true
  // }

  // if (options.length === 2) {
  // let minmax
  // let role

  // get all games that start with mask
  // const scores = findScoreObjs(mask)
  //
  // if (mask.length % 2 === 0) {
  //   minmax = getMax(scores)
  //   role = 'player'
  // } else {
  //   minmax = getMin(scores)
  //   role = 'ai'
  // }
  // // get last digit of best move
  // choice = minmax.uid.slice(-1)
  //
  // console.log(`${role} choice: ${choice}`)
  // // }
  //
  // return choice

  // const thisScore = findScore(mask)
  // // does this mask result in a terminal state?
  // if (thisScore !== undefined) {
  //   // the game doesn't pass in a winning mask.
  //   // but be passed in recursively
  //   // there is a score for this mask, so its a winner
  //   console.log(`${mask}: ${thisScore}`)
  //   return thisScore
  // } else {
    // there is no score for this mask; keep processing

    // if (options.length > 2) {
    //   // mask isn't a winner, so...
    //   // options.length is three or more, so parse and keep iterating
    //   // iterate thorugh options
    //   for (const option of options) {
    //     // pull each choice in option and add to mask
    //     const testMask = mask + option
    //     // make copy of options array
    //     const testOptions = options.slice()
    //     // remove test option
    //     testOptions.splice(testOptions.indexOf(option), 1)
    //     // pass options and test mask back into decide(array, choice)
    //     const choice = decide(testOptions, testMask)
    //     // temp outcome
    //     console.log(choice)
    //   }
    // } else if (options.length === 2) {
  // if (options.length === 2) {
  //   debugger
  //
  //   const choice = getMin(a,b)
  //   return choice
    // const mask0 = mask + options[0]
    // const mask1 = mask + options[1]
    // const mask0a = mask + options[0] + options[1]
    // const mask1a = mask + options[1] + options[0]
    // // can return multiple scores
    // const score0 = findScore(mask0)
    // const score1 = findScore(mask1)
    // const score0a = findScore(mask0a)
    // const score1a = findScore(mask1a)
    // // get minmax of the scores for those two
    // console.log(`${mask0}: ${score0} | ${mask0a}: ${score0a}`)
    // console.log(`${mask1}: ${score1} | ${mask1a}: ${score1a}`)
  // }
    // } else if (options.length === 1) {
    //   // check mask (8 digit) and return score if there is one
    //   let score = findScore(options, mask)
    //   console.log(`${mask}: ${score}`)
    //   // or else add last digit and return score
    //   const testMask = mask + options[0]
    //   score = findScore(options.shift(), testMask)
    //   // return score
    //   console.log(`${testMask}: ${score}`)
    // }
  // }

  // console.log(`decide(${minmax} : ${options} : ${mask}) => ${choice}`)

  // for (choice in options) {
  //
  // }
  // const numOptions = options.length

  // which option is the best (minimax?)

  // if one option, return scoreObjs

  // if two options, return minMax of value with better score

  // if three or more options, run call decide on options

  // how many objects? lots
  // let scoreObjs = scores.filter(function( obj ) {
  //   return obj.id.startsWith(mask)
  // })

  // no score unless only one value in options
  // let score = scoreObj.score

  // get smallest number (should always come back 0?)

  // const choice = options.reduce(function (options, move) {

    // handles math, now needs to get score first (may need to split and call self again)

    // if there's a score for this mask, return it

    // or else... take each one out and reduce it

  //   return Math.min(options, move)
  // }, options[0])

  // take each value in array determine its value by passing rest of array

  // const choice = options.reduce(options,
  //   (a, e, i, array) => a.findScore() < e.findScore() ? a : e,
  //   min
  // )

module.exports = {
  initAi,
  decide
}

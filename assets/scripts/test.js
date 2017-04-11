'use strict'
/*  UTLIITY FUNCTIONS */

//  hasValue(obj)
//    Filters the values of objects in an array that are not null

const hasValue = function (obj) {
  return obj.value !== null
}

//  filterMask(obj, mask)
//    Filters the values of objects in an array have a key starts with mask

// const filterByMask = function (obj) {
  // obj key starts with mask string
  // not an array, a list of objects with key:value
  // console.log(`${obj.uid}: ${mask}`)

//   return obj.uid.startsWith(mask)
// }

//  swap(array, index1, index2)
//    Swaps the values in two positions of an array

const swap = function (array, idx1, idx2) {
  const temp = array[idx1]
  array[idx1] = array[idx2]
  array[idx2] = temp
}

//  heapsPermute(array, output, n)
//    Generates a Heaps Permutation (every possible unique combination)
//    of an array of numbers, in this case, the 9 squares of the board

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

//  clearConsole()
//    Clears node REPL console during development

const clearConsole = function () {
  return process.stdout.write('\x1B[2J')
}

/*  SQUARE FUNCTIONS */

//  Square Object Prototype
//    Represents individual squares on the board

const Square = function () {
  // this.value = null (default) | 'X' | 'O'
  this.value = null
}

//  Square.prototype.reset()
//    Returns the square object to defaults

Square.prototype.reset = function () {
  this.value = null
  return this.value
}

//  Square.prototype.draw()
//    Displays properties for a square object

Square.prototype.draw = function () {
  // update UI when there is one
  if (this.value === null) {
    return '[ ]'
  } else {
    return '[' + this.value + ']'
  }
}

//  Square.prototype.select(player)
//    Sets its value to 'X' or 'O' when selected

Square.prototype.select = function (value) {
  if (['x', 'X', 'o', 'O'].includes(value)) {
    this.value = value.toUpperCase()
  }
  return this.value
}

/*  CUE FUNCTIONS */

//  Cue Object Prototype
//    Represents a series squares on the board (rows, columns, or diagonals)
//    that, when filled, win the game

const Cue = function (s1, s2, s3) {
  // s1, s2, and s3 are three square objects
  this.squares = [s1, s2, s3]
}

//  Cue.prototype.checkWin()
//    Cue checks if values of its squares match and returns the winner
//    ('X' or 'O') or false

//  NOTE: Squares should announce they've changed and cues should
//  check themselves if one of their squares updates, rather than
//  the board always checking. The cue should yell "Bingo!"

Cue.prototype.checkWin = function () {
  if (
    this.squares[0].value === this.squares[1].value &&
    this.squares[0].value === this.squares[2].value &&
    this.squares[1].value === this.squares[2].value
  ) {
    // all three are the same (return 1 for 'X', -1 for 'O', or 0 for tie)
    if (this.squares[0].value) {
      if (this.squares[0].value === 'X') {
        return 1
      } else {
        return -1
      }
    }
  } else {
    return 0
  }
}

/*  BOARD FUNCTIONS */

//  Board Object Prototype:
//    Represents the game board

const Board = function () {
  // initialze squares
  this.numSquares = 9
  this.squares = [ ]

  for (let i = 0; i < this.numSquares; i++) {
    // create new square objects
    this.squares.push(new Square())
  }

  // initialize cues
  this.cues = {}
  // cue name + three square numbers to track
  // NOTE: GENERATE PROGRAMATICALLY( 3 ROWS + 3 COLS + 2 DIAGS) - WHY? WHY NOT?
  const cueData = [
    {id: 'row1', squares: [0, 1, 2]},
    {id: 'row2', squares: [3, 4, 5]},
    {id: 'row3', squares: [6, 7, 8]},
    {id: 'col1', squares: [0, 3, 6]},
    {id: 'col2', squares: [1, 4, 7]},
    {id: 'col3', squares: [2, 5, 8]},
    {id: 'dia1', squares: [0, 4, 8]},
    {id: 'dia2', squares: [2, 4, 6]}
  ]

  // NOTE: CUES SHOULD BE ANONYMOUS TO THE BOARD AND HAVE THEIR ID AS AN INTERNAL PROPERTY

  for (const item of cueData) {
    this.cues[item.id] = new Cue(
      this.squares[item.squares[0]],
      this.squares[item.squares[1]],
      this.squares[item.squares[2]]
    )
  }
}

//  Board.prototype.reset()
//    Board resets itself and its square objects

Board.prototype.reset = function () {
  this.squares.forEach(function (square) {
    square.reset()
  })

  clearConsole()
  this.draw()
}

//  Board.prototype.draw()
//    Draws the board based on current square properties

Board.prototype.draw = function () {
  console.log(`${this.squares[0].draw()} ${this.squares[1].draw()} ${this.squares[2].draw()}`)
  console.log(`${this.squares[3].draw()} ${this.squares[4].draw()} ${this.squares[5].draw()}`)
  console.log(`${this.squares[6].draw()} ${this.squares[7].draw()} ${this.squares[8].draw()}`)

  console.log(' ---------')
}

//  Board.prototype.select()
//    Board selects one of its squares by telling its square to select itself

Board.prototype.select = function (num, value) {
  this.squares[num].select(value)

  //  NOTE: DOM manipulation will probably happen here for UI
}

//  Board.prototype.turnNum()
//    Returns the number of squares on the board that have been selected so far

Board.prototype.turnNum = function () {
  //  NOTE: THIS SHOULD BE HANDLED BY KEEPING TRACK OF A GLOBAL ARRAY OF TURNS
  //  THE turns.length = NUMBER OF TURNS PASSED
  //  PLUS, THE TURNS ARRAY/STRING IS THE PREFIX FOR FILTERING MOVES

  // return number of squares with non-null values
  const results = this.squares.filter(hasValue)
  return results.length
}

//  Board.prototype.checkWin()
//    Checks each cue to see if any are in a winning state

//  NOTE: could make squares smart & use events to notify a cue that one of it's children updated and the cue should check itself

Board.prototype.checkWin = function () {
  for (const cue in this.cues) {
    const result = this.cues[cue].checkWin()

    if (result) {
      return result
    }
  }
  return 0
}

//  Board.prototype.play()
//    Runs a game with the specified sequence of squares
//    Returns: 1 for a win, -1 for a loss, 0 for a tie

Board.prototype.play = function (options) {
  // should be able to take array or string
  if (!Array.isArray(options)) {
    options = options.split('')
  }
  let result = 0

  for (let i = 0; i < options.length; i++) {
    const squareNum = options[i]

    if (i % 2) {
      this.select(squareNum, 'O')
    } else {
      this.select(squareNum, 'X')
    }
    if (i > 4 && result === 0) {
      result = this.checkWin()
    }
  }
  return {'uid': options.join(''), 'score': result}
}

Board.prototype.generate = function () {
  // runs in 1.0-1.1 seconds on local
  const startTime = Date.now()

  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // initialize games array
  this.games = []
  // store this in a reference for iteration
  const that = this

  // generate all permuatations of 9 squares
  heapsPermute(options, function (input) {
    // play each possible sequence of squares
    const result = that.play(input)

    // store unique sequence of squares & score of 1, -1, or 0
    that.games.push({'uid': result['uid'], 'result': result['score']})
  })
  console.log(`${this.games.length} games`)
  return ((Date.now() - startTime) / 1000 + ' sec')
}
//  Board.prototype.run()
//    Test function to be called in node: board.run() to run through a process

Board.prototype.run = function () {
  // generate all game outcomes
  this.generate()

  // step through and get total value for each choice
  for (let i = 0; i < this.numSquares; i++) {
    const mask = i
    let sum = 0

    // filter games to ones with uids starting with mask
    const games = this.games.filter(function (game) {
      return (game.uid).startsWith(mask)
    })

    // create an array of values from filtered games
    const values = games.map(function (game) {
      const result = game.result
      return result
    })

    // GET TOTAL OF EACH VALUE 1, -1, 0 TO DISPLAY W - L - T
    // sort array of values
    values.sort()
    const losses = values.lastIndexOf(-1) + 1
    const ties = values.lastIndexOf(0) - losses + 1
    const wins = values.lastIndexOf(1) - ties - losses + 1

    // get the sum of the values for the filtered games
    sum = values.reduce(function (a, b) {
      return a + b
    }, 0)

    // player should go for max
    // computer should go for min

    console.log(`Choose ${mask}: ${sum}  ${wins}-${losses}-${ties}`)
  }
}

//  Board.prototype.test()
//    Test function to be called in node: board.test() to test stuff as we go

Board.prototype.test = function () {
  this.reset()

  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const turns = []

  for (let i = 0; i < this.numSquares; i++) {
    const index = Math.floor((Math.random() * options.length))
    const squareNum = options[index]

    if (i % 2) {
      this.select(squareNum, 'O')
    } else {
      this.select(squareNum, 'X')
    }
    this.draw()

    // remove squareNum chosen from available options
    options.splice(index, 1)

    // add squareNum to turns taken
    turns.push(squareNum)

    if (this.turnNum() >= 5) {
      const outcome = this.checkWin()
      if (outcome === 1) {
        console.log(`'X' wins in ${turns.length} turns`)
        break
      } else if (outcome === -1) {
        console.log(`'O' wins in ${turns.length} turns`)
        break
      }
    }
  }

  if (!this.checkWin()) {
    console.log(`Tie Game`)
  }

  for (let i = turns.length; i < this.numSquares; i++) {
    turns.push('-')
  }

  const gameid = turns.join('')
  console.log(`UID: ${gameid}`)
}

/*  MODULE EXPORTS */

module.exports = {
  Cue,
  Square,
  Board
}

/*  REPL TEST SCRIPTS

var x = require('./assets/scripts/test.js')
var board = new x.Board()

board.run()

board.test()

*/

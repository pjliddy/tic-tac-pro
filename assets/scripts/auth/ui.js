'use strict'

const store = require('../store.js')
const views = require('../views.js')

// signUpSuccess()
// successful reponse to sign up API call

const signUpSuccess = (data) => {
  views.message('sign up success')
  views.onSplashScreenView()
}

// signUpFailure()
// error in response to sign up API call

const signUpFailure = () => {
  views.message('sign up failed')
}

// signInSuccess()
// successful reponse to sign in API call

const signInSuccess = (response) => {
  // store the user object returned by response
  store.user = response.user
  views.onStartGameView()
}

// signInFailure()
// error in response to sign in API call

const signInFailure = () => {
  views.message('sign in failed')
}

// changePasswordSuccess()
// successful reponse to change password API call

const changePasswordSuccess = () => {
  views.onStartGameView()
  views.message('password changed')
}

// changePasswordFailure()
// error in response to change password API call

const changePasswordFailure = () => {
  views.message('password change failed')
}

// signOutSuccess()
// successful reponse to sign out API call

const signOutSuccess = () => {
  views.message('signed out')
  // remove user from current session store
  store.user = null
  views.setPublicNav()
  views.onSplashScreenView()
}

// signOutFailure()
// error in response to sign out API call

const signOutFailure = () => {
  views.message('sign out failed')
}

// createGameSuccess()
// successful reponse to create game API call

const createGameSuccess = (response) => {
  // store the user object returned by response
  store.game = response.game
}

// createGameFailure()
// error in response to create game API call

const createGameFailure = () => {
  views.message('couldn\'t save game')
}

// updateGameSuccess()
// successful reponse to create game API call
// NOTE: success or failure of update game API calls don't result in any output

const updateGameSuccess = () => {
  // console.log('updateGameSuccess():')
}

// updateGameFailure()
// error in response to create game API call
// NOTE: success or failure of update game API calls don't result in any output

const updateGameFailure = () => {
  // console.error('updateGameFailure():')
}

// getIndexSuccess()
// successful reponse to get index API call

// NOTE: this is asynchronous

const getIndexSuccess = (response) => {
  let message = ''
  const score = response.games.length
  const digit = score % 10

  // create message to user based on ones digit
  if (score === '11') {
    message = 'your ' + score + 'th game'
  } else if (score === 1) {
    message = 'your ' + score + 'st game'
  } else if (digit === '1') {
    message = 'your ' + digit + 'st game'
  } if (score === '12') {
    message = 'your ' + score + 'th game'
  } else if (digit === '2') {
    message = 'your ' + score + 'nd game'
  } else if (digit === '3') {
    message = 'your ' + score + 'rd game'
  } else {
    message = 'your ' + score + 'th game'
  }

  // switch (digit) {
  //   case 1:
  //     if (score === 11) {
  //       message = 'your ' + score + 'th game'
  //       break
  //     } else {
  //       message = 'your ' + score + 'st game'
  //       break
  //     }
  //   case 2:
  //     if (score === 12) {
  //       message = 'your ' + score + 'th game'
  //       break
  //     } else {
  //       message = 'your ' + score + 'nd game'
  //       break
  //     }
  //   case 3:
  //     message = 'your ' + score + 'rd game'
  //     break
  //   default:
  //     message = 'your ' + score + 'th game'
  // }

  views.addMessage(message)
}

// getIndexFailure()
// error in response to get index API call
// NOTE: failure of get index API calls doesn't result in any output

const getIndexFailure = () => {
  // console.error('getIndexFailure():')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  getIndexSuccess,
  getIndexFailure
}

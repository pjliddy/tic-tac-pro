'use strict'

const store = require('../store.js')
const view = require('../view.js')

// signUpSuccess()
// successful reponse to sign up API call

const signUpSuccess = (data) => {
  view.message('sign up success')
  view.onSplashScreenView()
}

// signUpFailure()
// error in response to sign up API call

const signUpFailure = () => {
  view.message('sign up failed')
}

// signInSuccess()
// successful reponse to sign in API call

const signInSuccess = (response) => {
  // store the user object returned by response
  store.user = response.user
  view.onStartGameView()
}

// signInFailure()
// error in response to sign in API call

const signInFailure = () => {
  view.message('sign in failed')
}

// changePasswordSuccess()
// successful reponse to change password API call

const changePasswordSuccess = () => {
  view.onStartGameView()
  view.message('password changed')
}

// changePasswordFailure()
// error in response to change password API call

const changePasswordFailure = () => {
  view.message('password change failed')
}

// signOutSuccess()
// successful reponse to sign out API call

const signOutSuccess = () => {
  view.message('signed out')
  // remove user from current session store
  store.user = null
  view.setPublicNav()
  view.onSplashScreenView()
}

// signOutFailure()
// error in response to sign out API call

const signOutFailure = () => {
  view.message('sign out failed')
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
  view.message('couldn\'t save game')
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

const getIndexSuccess = (response) => {
  const message = 'you\'ve played ' + response.games.length + ' games'
  view.addMessage(message)
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

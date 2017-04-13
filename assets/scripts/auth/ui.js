'use strict'

const store = require('../store.js')
const views = require('../views.js')
// const game = require('../game.js')

const signUpSuccess = (data) => {
  console.log('signUpSuccess():', data)
  views.message('sign up success')
  views.onSplashScreenView()
}

const signUpFailure = (error) => {
  console.error('signUpFailure():', error)
  views.message('sign up failed')
}

const signInSuccess = (response) => {
  console.log('signInSuccess():', response.user)
  // store the user object (data)
  store.user = response.user
  views.onStartGameView()
}

const signInFailure = (error) => {
  console.error('signInFailure():', error)
  views.message('sign in failed')
}

const changePasswordSuccess = (response) => {
  console.log('changePasswordSuccess:', response)
  views.onStartGameView()
  views.message('password changed')
}

const changePasswordFailure = (error) => {
  console.error('changePasswordFailure:', error)
  views.message('password change failed')
}

const signOutSuccess = (response) => {
  console.log('signOutSuccess:', response)
  views.message('signed out')
  // remove user from current session store
  store.user = null
  views.setPublicNav()
  views.onSplashScreenView()
}

const signOutFailure = (error) => {
  console.log('signOutFailure:', error)
  views.message('sign out failed')
}

const createGameSuccess = (response) => {
  console.log('createGameSuccess():', response)
  store.game = response.game
}

const createGameFailure = (error) => {
  console.error('createGameFailure():', error)
  views.message('couldn\'t save game')
}

const updateGameSuccess = (response) => {
  console.log('updateGameSuccess():', response)
}

const updateGameFailure = (error) => {
  console.error('updateGameFailure():', error)
  // views.message('update failed')
}

const getIndexSuccess = (response) => {
  console.log('getIndexSuccess():', response)

  let message = ''

  switch (response.games.length) {
    case 1:
      message = 'your 1st game'
      break
    case 2:
      message = 'your 2nd game'
      break
    case 3:
      message = 'your 3rd game'
      break
    default:
      message = 'your ' + response.games.length + 'th game'
  }

  views.addMessage(message)
}

const getIndexFailure = (error) => {
  console.error('getIndexFailure():', error)
  // views.message('update failed')
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

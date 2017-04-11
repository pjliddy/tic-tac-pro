'use strict'

const store = require('../store.js')
const game = require('../game.js')

const signUpSuccess = (data) => {
  console.log('signUpSuccess():', data)
  game.startGameView()
}

const signUpFailure = (error) => {
  console.error('signUpFailure():', error)
  game.message('sign up failed')
}

const signInSuccess = (response) => {
  console.log('signInSuccess():', response.user)
  // store the user object (data)
  store.user = response.user
  game.startGameView()
}

const signInFailure = (error) => {
  console.error('signInFailure():', error)
  game.message('sign in failed')
}

const changePasswordSuccess = (response) => {
  console.log('changePasswordSuccess:', response)
  game.message('password changed')
  game.backToGame()
}

const changePasswordFailure = (error) => {
  console.error('changePasswordFailure:', error)
  game.message('password change failed')
}

const signOutSuccess = (response) => {
  console.log('signOutSuccess:', response)
  game.message('signed out')
  // remove user from current session store
  store.user = null
  game.setPublicNav()
  game.onSplashScreenView()
}

const signOutFailure = (error) => {
  console.log('signOutFailure:', error)
  game.message('sign out failed')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}

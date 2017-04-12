'use strict'

const store = require('../store.js')
const views = require('../views.js')

const signUpSuccess = (data) => {
  console.log('signUpSuccess():', data)
  views.startGameView()
}

const signUpFailure = (error) => {
  console.error('signUpFailure():', error)
  views.message('sign up failed')
}

const signInSuccess = (response) => {
  console.log('signInSuccess():', response.user)
  // store the user object (data)
  store.user = response.user
  views.startGameView()
}

const signInFailure = (error) => {
  console.error('signInFailure():', error)
  views.message('sign in failed')
}

const changePasswordSuccess = (response) => {
  console.log('changePasswordSuccess:', response)
  views.message('password changed')
  views.backToGame()
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

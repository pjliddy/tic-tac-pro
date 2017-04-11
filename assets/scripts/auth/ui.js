'use strict'

const store = require('../store.js')

const signUpSuccess = (data) => {
  console.log('SIGN UP SUCCESS:', data)
  alert('signUpSuccess')
}

const signUpFailure = (error) => {
  console.error('SIGN UP ERROR:', error)
  alert('signUpFailure')
}

const signInSuccess = (response) => {
  console.log('SIGN IN SUCCESS:', response.user)
  // store the user object (data)
  store.user = response.user
  alert('signInSuccess')
}

const signInFailure = (error) => {
  console.error('SIGN IN ERROR:', error)
  alert('signInFailure')
}

const changePasswordSuccess = (response) => {
  console.log('CHANGE PASSWORD SUCCESS:', response)
}

const changePasswordFailure = (error) => {
  console.error('CHANGE PASSWORD ERROR:', error)
}

const signOutSuccess = (response) => {
  console.log('SIGN OUT SUCCESS:', response)
  // remove user from current session store
  store.user = null
}

const signOutFailure = (error) => {
  console.log('SIGN OUT FAILURE:', error)
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

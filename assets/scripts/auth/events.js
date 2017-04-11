'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const game = require('./../game.js')

const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  console.log('onSignUp')

  const data = getFormFields(this)
  event.preventDefault()

  if (!data.credentials.email) {
    game.message('email required')
  } else if (!data.credentials.password) {
    game.message('password required')
  } else if (!data.credentials.password_confirmation) {
    game.message('password confirmation required')
  } else if (data.credentials.password !== data.credentials.password_confirmation) {
    game.message('passwords must match')
  } else {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure)
  }
}

const onSignIn = function (event) {
  console.log('onSignIn')

  const data = getFormFields(this)
  event.preventDefault()

  if (!data.credentials.email) {
    game.message('email required')
  } else if (!data.credentials.password) {
    game.message('password required')
  } else {
    api.signIn(data)
      .then(ui.signInSuccess)
      .catch(ui.signInFailure)
  }
}

const onChangePassword = function (event) {
  console.log('onChangePassword')

  const data = getFormFields(event.target)
  event.preventDefault()

  if (!data.passwords.old) {
    game.message('old password required')
  } else if (!data.passwords.new.length) {
    game.message('new password required')
  } else {
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  }
}

const onSignOut = function (event) {
  event.preventDefault()

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addHandlers = () => {
  // using $('body') before the event handler binds the handler
  // to an element even if it's dynamically created later

  $('.content-state').on('click', '#auth-cancel-btn', game.onSplashScreenView)

  // $('#sign-up-btn').on('click', game.onSignUpView)
  $('.nav-state').on('click', '#sign-up-btn', game.onSignUpView)
  $('.content-state').on('submit', '#sign-up', onSignUp)

  // $('#sign-in-btn').on('click', game.onSignInView)
  $('.nav-state').on('click', '#sign-in-btn', game.onSignInView)
  $('.content-state').on('submit', '#sign-in', onSignIn)

  $('.nav-state').on('click', '#change-password-btn', game.onChangePasswordView)
  $('.content-state').on('submit', '#change-password', onChangePassword)
  $('.content-state').on('click', '#change-password-cancel-btn', game.backToGame)

  $('.nav-state').on('click', '#sign-out-btn', onSignOut)
}

module.exports = {
  addHandlers
}

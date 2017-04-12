'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const views = require('./../views.js')
const game = require('./../game.js')

const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  console.log('onSignUp')

  const data = getFormFields(this)
  event.preventDefault()

  console.log(data.credentials)

  if (data.credentials.email.length === 0) {
    views.message('email required')
  } else if (data.credentials.password.length === 0) {
    views.message('password required')
  } else if (!data.credentials.password_confirmation.length === 0) {
    views.message('password confirmation required')
  } else if (data.credentials.password !== data.credentials.password_confirmation) {
    views.message('passwords must match')
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
    views.message('email required')
  } else if (!data.credentials.password) {
    views.message('password required')
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
    views.message('old password required')
  } else if (!data.passwords.new.length) {
    views.message('new password required')
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

const onPlayGame = function () {
  views.playGameView()
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const addHandlers = () => {
  // using $('body') before the event handler binds the handler
  // to an element even if it's dynamically created later

  $('.content-state').on('click', '#auth-cancel-btn', views.onSplashScreenView)

  // $('#sign-up-btn').on('click', views.onSignUpView)
  $('.nav-state').on('click', '#sign-up-btn', views.onSignUpView)
  $('.content-state').on('submit', '#sign-up', onSignUp)

  // $('#sign-in-btn').on('click', views.onSignInView)
  $('.nav-state').on('click', '#sign-in-btn', views.onSignInView)
  $('.content-state').on('submit', '#sign-in', onSignIn)

  $('.nav-state').on('click', '#change-password-btn', views.onChangePasswordView)
  $('.content-state').on('submit', '#change-password', onChangePassword)
  $('.content-state').on('click', '#change-password-cancel-btn', views.backToGame)

  $('.nav-state').on('click', '#sign-out-btn', onSignOut)

  $('.content-state').on('click', '#play-game-btn', onPlayGame)

  $('.content-state').on('click', '.play-btn', game.chooseSquare)
}

module.exports = {
  addHandlers
}

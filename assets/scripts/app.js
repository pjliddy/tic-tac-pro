'use strict'
// const authEvents = require('./auth/events.js')
const getFormFields = require(`../../lib/get-form-fields`)
const viewControls = require('./viewControl.js')

// needs to become a game controller object
const game = require('./game.js')
const api = require('./auth/api')
const ui = require('./auth/ui')

// const getFormFields = require(`../../../lib/get-form-fields`)

const App = function () {
  this.views = new viewControls.ViewControl()
  this.addHandlers()
}

// addHandlers()
// assign event handlers to forms, buttons, and links in the UI

App.prototype.addHandlers = function () {
  // sign up handlers
  $('.nav-state').on('click', '#sign-up-btn', this.views.setSignUpView)
  $('.content-state').on('submit', '#sign-up', this.onSignUp)

  // sign in handlers
  $('.nav-state').on('click', '#sign-in-btn', this.views.setSignInView)
  $('.content-state').on('submit', '#sign-in', this.onSignIn)

  // cancel link handler (used in sign up and sign in forms)
  $('.content-state').on('click', '#auth-cancel-btn', this.views.setCancelForm)

  // password change handlers
  $('.nav-state').on('click', '#change-password-btn', this.views.setChangePasswordView)
  $('.content-state').on('submit', '#change-password', this.onChangePassword)
  $('.content-state').on('click', '#change-password-cancel-btn', this.views.setCancelPassword)

  // sign out handlers
  $('.nav-state').on('click', '#sign-out-btn', this.onSignOut)

  // game play handlers
  $('.content-state').on('click', '#play-game-btn', this.onPlayGame)
  $('.content-state').on('click', '.btn-move', game.chooseSquare)
}

// setSignUp()
// handle form submission for user sign up event

App.prototype.onSignUp = function (event) {
  // get data object from new user sign up form
  const data = getFormFields(this)
  // prevent default form post
  event.preventDefault()
  // // this.// views.beep()
  // validate user input
  if (data.credentials.email.length === 0) {
    this.views.message('email required')
  } else if (data.credentials.password.length === 0) {
    this.views.message('password required')
  } else if (!data.credentials.password_confirmation.length === 0) {
    this.views.message('password confirmation required')
  } else if (data.credentials.password !== data.credentials.password_confirmation) {
    this.views.message('passwords must match')
  } else {
    // make API call and set up handlers for callbacks
    api.signUp(data)
      .then(this.setCompleteSignIn(data))
      .catch(ui.signUpFailure)
  }
}

// onSignIn()
// handle form submission for user sign in event

App.prototype.onSignIn = function (event) {
  // get data object from user sign in form
  const data = getFormFields(this)
  // prevent default form post
  event.preventDefault()
  // this.// views.beep()
  // validate user input
  if (!data.credentials.email) {
    this.views.message('email required')
  } else if (!data.credentials.password) {
    this.views.message('password required')
  } else {
    // make API call and set up handlers for callbacks
    api.signIn(data)
      .then(ui.signInSuccess)
      .catch(ui.signInFailure)
  }
}

// onCompleteSignIn()
// handle form submission for user sign in as part of sign up

App.prototype.onCompleteSignIn = function (data) {
  if (!data.credentials.email) {
    this.views.message('email required')
  } else if (!data.credentials.password) {
    this.views.message('password required')
  } else {
    // make API call and set up handlers for callbacks
    api.signIn(data)
      .then(ui.signInSuccess)
      .catch(ui.signInFailure)
  }
}

// onChangePassword()
// handle form submission for change password event

App.prototype.onChangePassword = function (event) {
  // get data object from change password form
  const data = getFormFields(event.target)
  // prevent default form post
  event.preventDefault()
  // this.// views.beep()
  // validate user input
  if (!data.passwords.old) {
    this.views.message('old password required')
  } else if (!data.passwords.new.length) {
    this.views.message('new password required')
  } else {
    // make API call and set up handlers for callbacks
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  }
}

// onSignOut()
// handle user sign out event

App.prototype.onSignOut = function (event) {
  // prevent default form post
  event.preventDefault()
  // this.// views.beep()
  // make API call and set up handlers for callbacks
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// onPlayGame()
// handle user request to start a game

App.prototype.onPlayGame = function () {
  // set view state to playable game view
  this.views.onPlayGameView()
  // this.// views.beep()
  // initialize game engine
  game.initGame()
  // make API call and set up handlers for callbacks
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

module.exports = {
  App
}

'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const views = require('./../views.js')
const game = require('./../game.js')

const api = require('./api')
const ui = require('./ui')

// onSignUp()
// handle form submission for user sign up event

const onSignUp = function (event) {
  // get data object from new user sign up form
  const data = getFormFields(this)
  // prevent default form post
  event.preventDefault()
  views.beep()
  // validate user input
  if (data.credentials.email.length === 0) {
    views.message('email required')
  } else if (data.credentials.password.length === 0) {
    views.message('password required')
  } else if (!data.credentials.password_confirmation.length === 0) {
    views.message('password confirmation required')
  } else if (data.credentials.password !== data.credentials.password_confirmation) {
    views.message('passwords must match')
  } else {
    // make API call and set up handlers for callbacks
    api.signUp(data)
      .then(onCompleteSignIn(data))
      .catch(ui.signUpFailure)
  }
}

// onSignIn()
// handle form submission for user sign in event

const onSignIn = function (event) {
  // get data object from user sign in form
  const data = getFormFields(this)
  // prevent default form post
  event.preventDefault()
  views.beep()
  // validate user input
  if (!data.credentials.email) {
    views.message('email required')
  } else if (!data.credentials.password) {
    views.message('password required')
  } else {
    // make API call and set up handlers for callbacks
    api.signIn(data)
      .then(ui.signInSuccess)
      .catch(ui.signInFailure)
  }
}

// onCompleteSignIn()
// handle form submission for user sign in as part of sign up

const onCompleteSignIn = function (data) {
  if (!data.credentials.email) {
    views.message('email required')
  } else if (!data.credentials.password) {
    views.message('password required')
  } else {
    // make API call and set up handlers for callbacks
    api.signIn(data)
      .then(ui.signInSuccess)
      .catch(ui.signInFailure)
  }
}

// onChangePassword()
// handle form submission for change password event

const onChangePassword = function (event) {
  // get data object from change password form
  const data = getFormFields(event.target)
  // prevent default form post
  event.preventDefault()
  views.beep()
  // validate user input
  if (!data.passwords.old) {
    views.message('old password required')
  } else if (!data.passwords.new.length) {
    views.message('new password required')
  } else {
    // make API call and set up handlers for callbacks
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  }
}

// onSignOut()
// handle user sign out event

const onSignOut = function (event) {
  // prevent default form post
  event.preventDefault()
  views.beep()
  // make API call and set up handlers for callbacks
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// onPlayGame()
// handle user request to start a game

const onPlayGame = function () {
  // set view state to playable game view
  views.onPlayGameView()
  views.beep()
  // initialize game engine
  game.initGame()
  // make API call and set up handlers for callbacks
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

// addHandlers()
// assign event handlers to forms, buttons, and links in the UI

const addHandlers = () => {
  // using $(ancestor) before the event handler binds the handler
  // to an element even if it's dynamically created later

  // sign up handlers
  $('.nav-state').on('click', '#sign-up-btn', views.onSignUpView)
  $('.content-state').on('submit', '#sign-up', onSignUp)

  // sign in handlers
  $('.nav-state').on('click', '#sign-in-btn', views.onSignInView)
  $('.content-state').on('submit', '#sign-in', onSignIn)

  // cancel link handler (used in sign up and sign in forms)
  $('.content-state').on('click', '#auth-cancel-btn', views.onCancelForm)

  // password change handlers
  $('.nav-state').on('click', '#change-password-btn', views.onChangePasswordView)
  $('.content-state').on('submit', '#change-password', onChangePassword)
  $('.content-state').on('click', '#change-password-cancel-btn', views.onCancelPassword)

  // sign out handlers
  $('.nav-state').on('click', '#sign-out-btn', onSignOut)

  // game play handlers
  $('.content-state').on('click', '#play-game-btn', onPlayGame)
  $('.content-state').on('click', '.btn-move', game.chooseSquare)
}

module.exports = {
  addHandlers
}

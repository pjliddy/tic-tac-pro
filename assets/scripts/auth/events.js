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
  const data = getFormFields(this)
  event.preventDefault()

  console.log('onSignIn')

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

// const onChangePassword = function (event) {
//   const data = getFormFields(event.target)
//   event.preventDefault()
//
//   // console.log(`CHANGE PASSWORD: ${data.passwords.old} to ${data.passwords.new}`)
//
//   if (data.passwords.old.length !== 0 && data.passwords.new.length !== 0) {
//     api.changePassword(data)
//       .then(ui.changePasswordSuccess)
//       .catch(ui.changePasswordFailure)
//   } else {
//     console.log('old and new password required')
//   }
// }

// const onSignOut = function (event) {
//   event.preventDefault()
//
//   api.signOut()
//     .then(ui.signOutSuccess)
//     .catch(ui.signOutFailure)
// }

const addHandlers = () => {
  // using $('body') before the event handler binds the handler
  // to an element even if it's dynamically created later

  $('body').on('click', '#auth-cancel-btn', game.onSplashScreenView)

  // $('#sign-up-btn').on('click', game.onSignUpView)
  $('body').on('click', '#sign-up-btn', game.onSignUpView)
  $('body').on('submit', '#sign-up', onSignUp)

  // $('#sign-in-btn').on('click', game.onSignInView)
  $('body').on('click', '#sign-in-btn', game.onSignInView)
  $('body').on('submit', '#sign-in', onSignIn)

  // $('#change-password').on('submit', onChangePassword)
  // $('#sign-out').on('click', onSignOut)
}

module.exports = {
  addHandlers
}

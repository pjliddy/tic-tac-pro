'use strict'
const events = require('./auth/events.js')

const message = function (msg) {
  $('.message').text(msg)
}

const onSplashScreenView = function () {
  console.log('onSplashScreenView')

  const viewState = '<div class="grid">' +
    '<div class="square">t</div>' +
    '<div class="square border-row-center">i</div>' +
    '<div class="square">c</div>' +
    '<div class="square border-col-center">t</div>' +
    '<div class="square border-center">a</div>' +
    '<div class="square border-col-center">c</div>' +
    '<div class="square">t</div>' +
    '<div class="square border-row-center">o</div>' +
    '<div class="square">e</div>' +
  '</div>'

  $('.content-state').html(viewState)
  message('sign in to play')
}

const onSignUpView = function () {
  console.log('onSignUpView')

  const viewState = '<div class="form-box">' +
    '<form id="sign-up">' +
      '<fieldset>' +
        '<legend>sign up</legend>' +
        '<div class="form-group">' +
          '<input type="email" class="form-control" name=credentials[email] id="sign-up-email" placeholder="email">' +
        '</div>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name=credentials[password] id="sign-up-password" placeholder="password">' +
        '</div>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name=credentials[password_confirmation] id="sign-up-password-confirm" placeholder="confirm password">' +
        '</div>' +
        '<button type="submit" class="btn btn-default pull-right">submit</button>' +
        '<button class="btn btn-link pull-right" id="auth-cancel-btn">cancel</button>' +
      '</fieldset>' +
    '</form>' +
  '</div>'

  $('.content-state').html(viewState)
  $('#sign-up').on('submit', events.onSignUp)
  $('#auth-cancel-btn').on('click', onSplashScreenView)
}

const onSignInView = function () {
  console.log('onSignInView')

  const viewState = '<div class="form-box">' +
    '<form id="sign-in">' +
      '<fieldset>' +
        '<legend>sign in</legend>' +
        '<div class="form-group">' +
          '<input type="email" class="form-control" name=credentials[email] id="sign-in-email" placeholder="email">' +
        '</div>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name=credentials[password] id="sign-in-password" placeholder="password">' +
        '</div>' +
        '<button type="submit" class="btn btn-default pull-right">submit</button>' +
        '<button class="btn btn-link pull-right" id="auth-cancel-btn">cancel</button>' +
      '</fieldset>' +
    '</form>' +
  '</div>'

  $('.content-state').html(viewState)
  $('#sign-in').on('submit', events.onSignIn)
  $('#auth-cancel-btn').on('click', onSplashScreenView)
}
const initGame = function () {
  console.log('initGame')
}

module.exports = {
  message,
  initGame,
  onSplashScreenView,
  onSignUpView,
  onSignInView
}

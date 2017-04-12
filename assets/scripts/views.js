'use strict'

// const events = require('./auth/events.js')
const active = false

const initGame = function () {
  console.log('initGame')
}

const message = function (msg) {
  $('.message').text(msg)
}

const setPublicNav = function () {
  console.log('setPublicNav')

  const viewState = '<button class="btn btn-default" id="sign-up-btn">sign up</button> ' +
  '<button class="btn btn-default" id="sign-in-btn">sign in</button>'

  $('.nav-state').html(viewState)
}

const setPrivateNav = function () {
  console.log('setPrivateNav')

  const viewState =
  '<div class="navbar-header">' +
    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">' +
      '<span class="sr-only">Toggle navigation</span>' +
      'menu' +
    '</button>' +
    '<h1>tic tac toe</h1>' +
  '</div>' +
  '<div id="navbar" class="navbar-collapse collapse">' +
    '<ul class="nav navbar-nav navbar-right">' +
      '<li class="dropdown">' +
        '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">user@email.com <span class="caret"></span></a>' +
        '<ul class="dropdown-menu" id="user-select">' +
          // '<li><a href="#" disabled>Save Game</a></li>' +
          '<li><a href="#" id="load-game-btn">Load Game</a></li>' +
          '<li><a href="#" id="change-password-btn">Change Password</a></li>' +
          '<li><a href="#" id="sign-out-btn">Sign Out</a></li>' +
        '</ul>' +
      '</li>' +
    '</ul>' +
  '</div>'

  $('.nav-state').html(viewState)
  message('sign in to play')
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
        '<button type="button" class="btn btn-link pull-right" id="auth-cancel-btn">cancel</button>' +
      '</fieldset>' +
    '</form>' +
  '</div>'

  $('.content-state').html(viewState)
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
        '<button type="button" class="btn btn-link pull-right" id="auth-cancel-btn">cancel</button>' +
      '</fieldset>' +
    '</form>' +
  '</div>'

  $('.content-state').html(viewState)
}

const startGameView = function () {
  console.log('onSplashScreenView')

  const viewState = '<div class="grid">' +
    '<div class="square"></div>' +
    '<div class="square border-row-center"></div>' +
    '<div class="square"></div>' +
    '<div class="square border-col-center"></div>' +
    '<div class="square border-center"><button class="btn btn-default btn-lg btn-grid" id="play-game-btn">play</button></div>' +
    '<div class="square border-col-center"></div>' +
    '<div class="square"></div>' +
    '<div class="square border-row-center"></div>' +
    '<div class="square"></div>' +
  '</div>'

  $('.content-state').html(viewState)
  setPrivateNav()
  message('ready to play')
}

const onChangePasswordView = function () {
  console.log('onChangePasswordView')
  event.preventDefault()
  message('')

  const viewState = '<div class="form-box">' +
    '<form id="change-password">' +
      '<fieldset>' +
        '<legend>change password</legend>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name=passwords[old] id="change-password-old" placeholder="old password">' +
        '</div>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name=passwords[new] id="change-password-new" placeholder="new password">' +
        '</div>' +
        '<button type="submit" class="btn btn-default pull-right">submit</button>' +
        '<button type="button" class="btn btn-link pull-right" id="change-password-cancel-btn">cancel</button>' +
      '</fieldset>' +
    '</form>' +
  '</div>'

  $('.content-state').html(viewState)
}

const backToGame = function () {
  if (active) {
    message('active game')
  } else {
    startGameView()
  }
}

const onPlayGameView = function () {
  console.log('onSplashScreenView')

  const viewState = '<div class="grid">' +
    '<div class="square"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
    '<div class="square border-row-center"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
    '<div class="square"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
    '<div class="square border-col-center"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
    '<div class="square border-center"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
    '<div class="square border-col-center"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
    '<div class="square"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
    '<div class="square border-row-center"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
    '<div class="square"><button class="btn btn-lg btn-default player">&#12295;</button></div>' +
  '</div>'

  $('.content-state').html(viewState)
  setPrivateNav()
  message('player X\'s turn')
}

module.exports = {
  initGame,
  message,
  setPublicNav,
  setPrivateNav,
  onSplashScreenView,
  onSignUpView,
  onSignInView,
  startGameView,
  onChangePasswordView,
  backToGame,
  onPlayGameView
}

'use strict'

// initViews()
// initialize views if needed

const initViews = function () {
  // TO DO: should load view states into empty containers on index.html on app init
}

// message()
// sets the html content of the message component in the game UI

const message = function (msg) {
  $('.message').html(msg)
}

// addMessage()
// add a second line of text to the message component in the game UI

const addMessage = function (msg) {
  const current = $('.message').html()
  $('.message').html(current + '<br/>' + msg)
}

// setPublicNav()
// sets the html content of the nav-state component for unauthenticated users

const setPublicNav = function () {
  const viewState =
    '<div class="btn-group" role="group">' +
      '<button class="btn btn-default" id="sign-up-btn">sign up</button>' +
      '<button class="btn btn-default" id="sign-in-btn">sign in</button>' +
    '</div>'

  $('.nav-state').html(viewState)
}

// setPrivateNav()
// sets the html content of the nav-state component for authenticated users

const setPrivateNav = function () {
  const viewState =
    '<div class="navbar-header pull-left">' +
      '<h1 class="navbar-brand">tic tac pro</h1>' +
    '</div>' +
    '<div class="navbar-header pull-right navbar-right">' +
      '<button type="button" class="btn btn-link navbar-btn" id="change-password-btn">&Delta; pwd</button>' +
      '<button type="button" class="btn btn-link navbar-btn" id="sign-out-btn">bye</button>' +
    '</div>'

  $('.nav-state').html(viewState)
}

// onSplashScreenView()
// sets the html content of the content-state component to the default splash
// screen for unauthenticated users

const onSplashScreenView = function () {
  const viewState =
    '<div class="grid">' +
      '<div class="square">t</div>' +
      '<div class="square border-row-center">i</div>' +
      '<div class="square">c</div>' +
      '<div class="square border-col-center">t</div>' +
      '<div class="square border-center">a</div>' +
      '<div class="square border-col-center">c</div>' +
      '<div class="square">p</div>' +
      '<div class="square border-row-center">r</div>' +
      '<div class="square">o</div>' +
    '</div>'

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })

  // reset buttons in navbar
  $('#sign-in-btn').removeClass('active')
  $('#sign-up-btn').removeClass('active')
}

// onSignUpView()
// sets the html content of the content-state component to the sign up form

const onSignUpView = function () {
  const viewState =
    '<div class="form-box">' +
      '<form id="sign-up">' +
        '<fieldset>' +
          '<legend>sign up</legend>' +
          '<div class="form-group">' +
            '<input type="email" class="form-control" name="credentials[email]"  id="sign-up-email" placeholder="email">' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="password" class="form-control"  name="credentials[password]" id="sign-up-password"  placeholder="password">' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="password" class="form-control" name="credentials[password_confirmation]" id="sign-up-password-confirm" placeholder="confirm password">' +
          '</div>' +
          '<button type="submit" class="btn btn-default pull-right">submit</button>' +
          '<button type="button" class="btn btn-link pull-right" id="auth-cancel-btn">cancel</button>' +
        '</fieldset>' +
      '</form>' +
    '</div>'

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })

  // set active states for navbar buttons when selected
  // TO DO: use Bootstrap's native radio button functionality to
  // automatically set states of buttons in group
  $('#sign-up-btn').addClass('active')
  $('#sign-in-btn').removeClass('active')
}

// onSignInView()
// sets the html content of the content-state component to the sign in form

const onSignInView = function () {
  const viewState =
    '<div class="form-box">' +
      '<form id="sign-in">' +
        '<fieldset>' +
          '<legend>sign in</legend>' +
          '<div class="form-group">' +
            '<input type="email" class="form-control" name="credentials[email]" id="sign-in-email" placeholder="email">' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="password" class="form-control" name="credentials[password]" id="sign-in-password" placeholder="password">' +
          '</div>' +
          '<button type="submit" class="btn btn-default pull-right">submit</button>' +
          '<button type="button" class="btn btn-link pull-right" id="auth-cancel-btn">cancel</button>' +
        '</fieldset>' +
      '</form>' +
    '</div>'

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })

  // set active states for navbar buttons when selected
  // TO DO: use Bootstrap's native radio button functionality to
  // automatically set states of buttons in group
  $('#sign-in-btn').addClass('active')
  $('#sign-up-btn').removeClass('active')
}

// onChangePasswordView()
// sets the html content of the content-state component to the
// change password form

const onChangePasswordView = function () {
  // prevent default form post
  event.preventDefault()
  const viewState =
    '<div class="form-box">' +
      '<form id="change-password">' +
        '<fieldset>' +
          '<legend>change password</legend>' +
          '<div class="form-group">' +
            '<input type="password" class="form-control" name="passwords[old]" id="change-password-old" placeholder="old password">' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="password" class="form-control" name="passwords[new]" id="change-password-new" placeholder="new password">' +
          '</div>' +
          '<button type="submit" class="btn btn-default pull-right">submit</button>' +
          '<button type="button" class="btn btn-link pull-right" id="change-password-cancel-btn">cancel</button>' +
        '</fieldset>' +
      '</form>' +
    '</div>'

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })
}

// onStartGameView()
// sets the html content of the content-state component to the start game view

const onStartGameView = function () {
  const viewState =
    '<div class="grid">' +
      '<div class="square"></div>' +
      '<div class="square border-row-center"></div>' +
      '<div class="square"></div>' +
      '<div class="square border-col-center"></div>' +
      '<div class="square border-center">' +
        '<button class="btn btn-default btn-lg btn-grid" id="play-game-btn">play</button>' +
      '</div>' +
      '<div class="square border-col-center"></div>' +
      '<div class="square"></div>' +
      '<div class="square border-row-center"></div>' +
      '<div class="square"></div>' +
    '</div>'

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    setPrivateNav()
    // message('')
    $('.content-state').html(viewState).fadeIn(150)
  })
}

// onPlayGameView()
// sets the html content of the content-state component to the play game viw

const onPlayGameView = function () {
  const viewState =
    '<div class="grid">' +
      '<div class="square"><button class="btn btn-lg btn-default play-btn" data-id="0"></button></div>' +
      '<div class="square border-row-center"><button class="btn btn-lg btn-default play-btn" data-id="1"></button></div>' +
      '<div class="square"><button class="btn btn-lg btn-default play-btn" data-id="2"></button></div>' +
      '<div class="square border-col-center"><button class="btn btn-lg btn-default play-btn" data-id="3"></button></div>' +
      '<div class="square border-center"><button class="btn btn-lg btn-default play-btn" data-id="4"></button></div>' +
      '<div class="square border-col-center"><button class="btn btn-lg btn-default play-btn" data-id="5"></button></div>' +
      '<div class="square"><button class="btn btn-lg btn-default play-btn" data-id="6"></button></div>' +
      '<div class="square border-row-center"><button class="btn btn-lg btn-default play-btn" data-id="7"></button></div>' +
      '<div class="square"><button class="btn btn-lg btn-default play-btn" data-id="8"></button></div>' +
    '</div>'

  $('.content-state').html(viewState)
  // apply jQuery fade to content change
  $('.navbar-right').fadeOut(150)
}

// onGameOverView()
// sets the html content of the content-state component to the game over view

const onGameOverView = function () {
  const viewState = '<button class="btn btn-default btn-lg btn-grid" id="play-game-btn">play</button>'

  // apply jQuery fade to content change
  $('.navbar-right').fadeIn(150)
  $('.border-center').html(viewState).fadeIn(150)
  message('game over')
}

module.exports = {
  initViews,
  message,
  addMessage,
  setPublicNav,
  setPrivateNav,
  onSplashScreenView,
  onSignUpView,
  onSignInView,
  onStartGameView,
  onChangePasswordView,
  onPlayGameView,
  onGameOverView
}

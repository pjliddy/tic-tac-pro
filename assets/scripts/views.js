'use strict'

const initViews = function () {
  console.log('initViews')
}

const message = function (msg) {
  $('.message').text(msg)
}

const setPublicNav = function () {
  console.log('setPublicNav')

  const viewState = '<div class="btn-group" role="group">' +
    '<button class="btn btn-default" id="sign-up-btn">sign up</button>' +
    '<button class="btn btn-default" id="sign-in-btn">sign in</button>' +
    '</div>'

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
      // '<li class="dropdown">' +
      //   '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">menu <span class="caret"></span></a>' +
        // '<ul class="dropdown-menu" id="user-select">' +
          '<li><a href="#" id="change-password-btn">&Delta; pwd</a></li>' +
          '<li><a href="#" id="sign-out-btn">bye</a></li>' +
        // '</ul>' +
      // '</li>' +
    '</ul>' +
  '</div>'

  $('.nav-state').html(viewState)
  message('')
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

  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })

  message('')

  $('#sign-in-btn').removeClass('active')
  $('#sign-up-btn').removeClass('active')
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

  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })

  // $('.content-state').html(viewState)
  $('#sign-up-btn').addClass('active')
  $('#sign-in-btn').removeClass('active')
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

  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })

  $('#sign-in-btn').addClass('active')
  $('#sign-up-btn').removeClass('active')
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

  setPrivateNav()
  message('')

  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })
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

  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })
}

const backToGame = function () {
  // if (active) {
  //   message('active game')
  // } else {
  startGameView()
  // }
}

const playGameView = function () {
  console.log('onSplashScreenView')

  const viewState = '<div class="grid">' +
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

  $('.content-state').html(viewState).fadeIn(150)

  setPrivateNav()
}

const gameOverView = function () {
  const viewState = '<button class="btn btn-default btn-lg btn-grid" id="play-game-btn">play</button>'

  // $('.border-center').fadeOut(150, function () {
  //   $('.border-center').html(viewState).fadeIn(150)
  // })

  $('.border-center').html(viewState)
  message('game over')
}

module.exports = {
  initViews,
  message,
  setPublicNav,
  setPrivateNav,
  onSplashScreenView,
  onSignUpView,
  onSignInView,
  startGameView,
  onChangePasswordView,
  backToGame,
  playGameView,
  gameOverView
}

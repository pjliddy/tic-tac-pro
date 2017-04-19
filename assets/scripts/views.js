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
  const viewState = require('./views/nav-public.js').content
  $('.nav-state').html(viewState)
}

// setPrivateNav()
// sets the html content of the nav-state component for authenticated users

const setPrivateNav = function () {
  const viewState = require('./views/nav-private.js').content
  $('.nav-state').html(viewState)
}

// onSplashScreenView()
// sets the html content of the content-state component to the default splash
// screen for unauthenticated users

const onSplashScreenView = function () {
  const viewState = require('./views/content-splash.js').content

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })

  // reset buttons in navbar
  $('.nav-state .btn-group .btn').removeClass('active')
}

// onSignUpView()
// sets the html content of the content-state component to the sign up form

const onSignUpView = function () {
  const viewState = require('./views/content-sign-up.js').content

  message('')

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })

  // set active states for navbar buttons when selected
  // TO DO: use Bootstrap's native radio button functionality to
  // automatically set states of buttons in group
  // $('#sign-up-btn').addClass('active')
  // $('#sign-in-btn').removeClass('active')

  $('.nav-state .btn-group .btn').click(function () {
    $('.nav-state .btn-group .btn').removeClass('active')
    $(this).addClass('active')
  })
}

// onSignInView()
// sets the html content of the content-state component to the sign in form

const onSignInView = function () {
  const viewState = require('./views/content-sign-in.js').content

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })
  message('')
  // set active states for navbar buttons when selected
  // TO DO: use Bootstrap's native radio button functionality to
  // automatically set states of buttons in group
  // $('#sign-in-btn').addClass('active')
  // $('#sign-up-btn').removeClass('active')

  $('.nav-state .btn-group .btn').click(function () {
    $('.nav-state .btn-group .btn').removeClass('active')
    $(this).addClass('active')
  })
}

// onChangePasswordView()
// sets the html content of the content-state component to the
// change password form

const onChangePasswordView = function () {
  const viewState = require('./views/content-change-password.js').content
  // prevent default form post
  event.preventDefault()

  message('')

  // apply jQuery cross fade to content change
  $('.content-state').fadeOut(150, function () {
    $('.content-state').html(viewState).fadeIn(150)
  })
}

// onStartGameView()
// sets the html content of the content-state component to the start game view

const onStartGameView = function () {
  const viewState = require('./views/content-start-game.js').content

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
  const viewState = require('./views/content-play-game.js').content

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

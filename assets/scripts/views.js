'use strict'

let audio = ''
let messageView = null
let navStateView = null
let contentView = null
let footerView = null

// initViews()
//    initialize views if needed

const init = function () {
  // set up audio
  audio = new Audio(
    'https://s3.amazonaws.com/pliddy-ga/tic-tac-toe/audio/beep.mp3'
  )

  // create View objects
  const Views = require('./view.js')
  messageView = new Views.View($('.message'))
  navStateView = new Views.View($('.nav-state'))
  contentView = new Views.View($('.content-state'))
  footerView = new Views.View($('footer'))

  // init Application Views
  setPublicNav()
  onSplashScreenView()
  messageView.clear()
  setFooter()
}

const beep = function () {
  // play sound effect
  audio.play()
}

// message()
//    sets the html content of the message component in the game UI

const message = function (msg) {
  messageView.render(msg)
}

// addMessage()
//    add a second line of text to the message component in the game UI

const addMessage = function (msg) {
  messageView.render(messageView.content() + '<br/>' + msg)
}

// setPublicNav()
//    sets the html content of the nav-state component for unauthenticated users

const setPublicNav = function () {
  const viewState = require('./views/nav-public.js').content
  navStateView.render(viewState)
}

// setPrivateNav()
//    sets the html content of the nav-state component for authenticated users

const setPrivateNav = function () {
  const viewState = require('./views/nav-private.js').content
  navStateView.render(viewState)
}

// setFooter()
//    sets the html content of the footer component

const setFooter = function () {
  const viewState = require('./views/footer.js').content
  footerView.renderFadeIn(viewState, 150)
}

// onSplashScreenView()
//    sets the html content of the content-state component to the default splash
//    screen for unauthenticated users

const onSplashScreenView = function () {
  const viewState = require('./views/content-splash.js').content
  contentView.renderCrossFade(viewState, 150)

  // reset buttons in navbar
  $('.nav-state .btn-group .btn').removeClass('active')
}

const onCancelForm = function () {
  beep()
  onSplashScreenView()
}

// onSignUpView()
//    sets the html content of the content-state component to the sign up form

const onSignUpView = function () {
  beep()
  messageView.clear()
  const viewState = require('./views/content-sign-up.js').content
  contentView.renderCrossFade(viewState, 150)

  // set active states for navbar buttons when selected
  $('.nav-state .btn-group .btn').click(function () {
    $('.nav-state .btn-group .btn').removeClass('active')
    $(this).addClass('active')
  })
}

// onSignInView()
//    sets the html content of the content-state component to the sign in form

const onSignInView = function () {
  beep()
  messageView.clear()
  const viewState = require('./views/content-sign-in.js').content
  contentView.renderCrossFade(viewState, 150)

  // set active states for navbar buttons when selected
  $('.nav-state .btn-group .btn').click(function () {
    $('.nav-state .btn-group .btn').removeClass('active')
    $(this).addClass('active')
  })
}

// onChangePasswordView()
//    sets the html content of the content-state component to the
//    change password form

const onChangePasswordView = function () {
  // prevent default form post
  event.preventDefault()
  beep()
  messageView.clear()
  const viewState = require('./views/content-change-password.js').content
  contentView.renderCrossFade(viewState, 150)
}

// onCancelPassword()
//    resets the html content of the content-state component if user
//    cancels the change password form

const onCancelPassword = function () {
  beep()
  onStartGameView()
}

// onStartGameView()
//    sets the html content of the content-state component
//    to the start game view

const onStartGameView = function () {
  const viewState = require('./views/content-start-game.js').content

  setPrivateNav()
  contentView.renderCrossFade(viewState, 150)
}

// onPlayGameView()
//    sets the html content of the content-state component
//    to the play game view

const onPlayGameView = function () {
  beep()
  const viewState = require('./views/content-play-game.js').content

  // $('.content-state').html(viewState)
  contentView.renderFadeIn(viewState, 150)
  // apply jQuery fade to content change
  $('.navbar-right').fadeOut(150)
}

// onGameOverView()
//    sets the html content of the content-state component to the game over view

const onGameOverView = function () {
  const viewState = '<button class="btn btn-default btn-lg btn-grid" id="play-game-btn">play</button>'

  // apply jQuery fade to content change
  $('.navbar-right').fadeIn(150)
  $('.border-center').html(viewState).fadeIn(150)
  // message('game over')
}

module.exports = {
  init,
  beep,
  message,
  addMessage,
  setPublicNav,
  setPrivateNav,
  setFooter,
  onSplashScreenView,
  onCancelForm,
  onSignUpView,
  onSignInView,
  onStartGameView,
  onChangePasswordView,
  onCancelPassword,
  onPlayGameView,
  onGameOverView
}

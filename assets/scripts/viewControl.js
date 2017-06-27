'use strict'

// ViewControl Object
//    Represents a view controller for the application

const ViewControl = function () {
  // initialize audio
//   this.audio = new Audio('https://s3.amazonaws.com/pliddy-ga/tic-tac-toe/audio/beep.mp3'
// )

  // create View objects
  const Views = require('./view.js')
  this.messageView = new Views.View($('.message'))
  this.navStateView = new Views.View($('.nav-state'))
  this.contentView = new Views.View($('.content-state'))
  this.footerView = new Views.View($('footer'))

  this.init()
}

// ViewControl.initViews()
//    initialize application view controller

ViewControl.prototype.init = function () {
  // init Application Views
  this.setPublicNav()
  this.setSplashScreenView()
  this.messageView.clear()
  this.setFooter()
}

// ViewControl.beep()
//    plays beep mp.3 sound when player clicks UI buttons

// ViewControl.prototype.beep = function () {
//   // play sound effect
//   this.audio.play()
// }

// ViewControl.message()
//    sets the html content of the message component in the game UI

ViewControl.prototype.message = function (msg) {
  this.messageView.render(msg)
}

// ViewControl.addMessage()
//    add a second line of text to the message component in the game UI

ViewControl.prototype.addMessage = function (msg) {
  this.messageView.render(this.messageView.content() + '<br/>' + msg)
}

// ViewControl.setPublicNav()
//    sets the html content of the nav-state component for unauthenticated users

ViewControl.prototype.setPublicNav = function () {
  const viewState = require('./views/nav-public.js').content
  this.navStateView.render(viewState)
}

// ViewControl.setPrivateNav()
//    sets the html content of the nav-state component for authenticated users

ViewControl.prototype.setPrivateNav = function () {
  const viewState = require('./views/nav-private.js').content
  this.navStateView.render(viewState)
}

// ViewControl.setFooter()
//    sets the html content of the footer component

ViewControl.prototype.setFooter = function () {
  const viewState = require('./views/footer.js').content
  this.footerView.renderFadeIn(viewState, 150)
}

// ViewControl.setSplashScreenView()
//    sets the html content of the content-state component to the
//    default splash screen for unauthenticated users

ViewControl.prototype.setSplashScreenView = function () {
  const viewState = require('./views/content-splash.js').content
  this.contentView.renderCrossFade(viewState, 150)

  // reset buttons in navbar
  $('.nav-state .btn-group .btn').removeClass('active')
}

ViewControl.prototype.setCancelForm = function () {
  this.beep()
  this.setSplashScreenView()
}

// ViewControl.setSignUpView()
//    sets the html content of the content-state component to the sign up form

ViewControl.prototype.setSignUpView = function () {
  ViewControl.beep()
  this.messageView.clear()
  const viewState = require('./views/content-sign-up.js').content
  this.contentView.renderCrossFade(viewState, 150)

  // set active states for navbar buttons when selected
  $('.nav-state .btn-group .btn').click(function () {
    $('.nav-state .btn-group .btn').removeClass('active')
    $(this).addClass('active')
  })
}

// ViewControl.setSignInView()
//    sets the html content of the content-state component to the sign in form

ViewControl.prototype.setSignInView = function () {
  this.beep()
  this.messageView.clear()
  const viewState = require('./views/content-sign-in.js').content
  this.contentView.renderCrossFade(viewState, 150)

  // set active states for navbar buttons when selected
  $('.nav-state .btn-group .btn').click(function () {
    $('.nav-state .btn-group .btn').removeClass('active')
    $(this).addClass('active')
  })
}

// ViewControl.setChangePasswordView()
//    sets the html content of the content-state component to the
//    change password form

ViewControl.prototype.setChangePasswordView = function (event) {
  // prevent default form post
  event.preventDefault()
  this.beep()
  this.messageView.clear()
  const viewState = require('./views/content-change-password.js').content
  this.contentView.renderCrossFade(viewState, 150)
}

// ViewControl.setCancelPassword()
//    resets the html content of the content-state component if user
//    cancels the change password form

ViewControl.prototype.setCancelPassword = function () {
  this.beep()
  this.setStartGameView()
}

// ViewControl.setStartGameView()
//    sets the html content of the content-state component
//    to the start game view

ViewControl.prototype.setStartGameView = function () {
  const viewState = require('./views/content-start-game.js').content

  this.setPrivateNav()
  this.contentView.renderCrossFade(viewState, 150)
}

// ViewControl.setPlayGameView()
//    sets the html content of the content-state component
//    to the play game view

ViewControl.prototype.setPlayGameView = function () {
  this.beep()
  const viewState = require('./views/content-play-game.js').content

  // $('.content-state').html(viewState)
  this.contentView.renderFadeIn(viewState, 150)
  // apply jQuery fade to content change
  $('.navbar-right').fadeOut(150)
}

// ViewControl.setGameOverView()
//    sets the html content of the content-state component to the game over view

ViewControl.prototype.setGameOverView = function () {
  const viewState = '<button class="btn btn-default btn-lg btn-grid" id="play-game-btn">play</button>'

  // apply jQuery fade to content change
  $('.navbar-right').fadeIn(150)
  $('.border-center').html(viewState).fadeIn(150)
  // message('game over')
}

module.exports = {
  ViewControl
}

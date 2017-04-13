'use strict'

const config = require('../config.js')
const store = require('../store.js')

// signUp()
// AJAX call to sign up API

const signUp = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

// signIn()
// AJAX call to sign in API

const signIn = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

// changePassword()
// AJAX call to change password API

const changePassword = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

// signOut()
// AJAX call to sign out API

const signOut = () => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

// createGame()
// AJAX call to create game API

const createGame = () => {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    body: {}
  })
}

// updateGame()
// AJAX call to update game API

const updateGame = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: data
  })
}

// getIndex()
// AJAX call to get index API

const getIndex = () => {
  return $.ajax({
    url: config.apiOrigin + '/games?over=true',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  createGame,
  updateGame,
  getIndex
}

'use strict'

const config = require('../config.js')
const store = require('../store.js')

const signUp = (data) => {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

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

const signOut = () => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const createGame = () => {
  console.log('createGame()')
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    body: {}
  })
}

const updateGame = (data) => {
  console.log('updateGame(): ', data)
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: data
  })
}

const getIndex = () => {
  console.log('getIndex()')
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

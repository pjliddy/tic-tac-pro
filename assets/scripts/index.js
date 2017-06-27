'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
// const board = require('./board')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const authEvents = require('./auth/events.js')
const views = require('./views.js')

// On document ready
$(() => {
  authEvents.addHandlers()
  // initialize application view states
  views.initViews()

  // when client app loads, make a GET request to the API
  // to wake up heroku while user signs up/in
  $.ajax({
    url: config.apiOrigin,
    method: 'GET'
  })
})

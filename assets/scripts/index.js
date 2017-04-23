'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events.js')
const views = require('./views.js')

$(() => {
  setAPIOrigin(location, config)
})

// use require without a reference to ensure a file is bundled
require('./example')

// On document ready
$(() => {
  authEvents.addHandlers()
  views.init()
})

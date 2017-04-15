'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const authEvents = require('./auth/events.js')
const view = require('./view.js')
const ai = require('./ai.js')

// On document ready
$(() => {
  authEvents.addHandlers()
  // initialize application view states
  view.initView()

  // since this command may take a second or more, it should be run with
  // a callback function so the UI doesn't hang while AI is initializing
  ai.initAi()
})

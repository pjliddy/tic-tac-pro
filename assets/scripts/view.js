'use strict'

// View Object
//    Represents a view state controller

const View = function (div) {
  this.wrapper = div
}

View.prototype.render = function (content) {
  $(this.wrapper).html(content)
}

View.prototype.renderFadeIn = function (content, rate) {
  $(this.wrapper).html(content).fadeIn(rate)
}

View.prototype.renderFadeOut = function (content, rate) {
  $(this.wrapper).html(content).fadeOut(rate)
}

View.prototype.clear = function () {
  $(this.wrapper).html('')
}

module.exports = {
  View
}

'use strict'

// View Object
//    Represents a view state controller

const View = function (div) {
  this.wrapper = div
}

// View.render(content)
//    updates the html of the View objects's wrapper

View.prototype.render = function (content) {
  $(this.wrapper).html(content)
}

// View.renderCrossFade(content, rate)
//    updates the html of the View objects with a cross fade

View.prototype.renderCrossFade = function (content, rate) {
  $(this.wrapper).fadeOut(150, () => $(this.wrapper).html(content).fadeIn(150)
  )
}

// View.renderFadeIn(content, rate)
//    updates the html of the View objects with a fadeIn

View.prototype.renderFadeIn = function (content, rate) {
  $(this.wrapper).html(content).fadeIn(rate)
}

// View.renderFadeOut(content)
//    updates the html of the View objects with a fadeOut

View.prototype.renderFadeOut = function (content, rate) {
  $(this.wrapper).html(content).fadeOut(rate)
}

// View.clear(content)
//    clears the html of the View objects's wrapper

View.prototype.clear = function () {
  $(this.wrapper).html('')
}

// View.content()
//    returns html contnent of View object's wrapper

View.prototype.content = function () {
  return $(this.wrapper).html()
}
module.exports = {
  View
}

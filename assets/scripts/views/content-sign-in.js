'use strict'

const content =
  '<div class="form-box">' +
    '<form id="sign-in">' +
      '<fieldset>' +
        '<legend>sign in</legend>' +
        '<div class="form-group">' +
          '<input type="email" class="form-control" name="credentials[email]" id="sign-in-email" placeholder="email" value="">' +
        '</div>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name="credentials[password]" id="sign-in-password" placeholder="password" value="">' +
        '</div>' +
        '<button type="submit" class="btn btn-default pull-right">submit</button>' +
        '<button type="button" class="btn btn-link pull-right" id="auth-cancel-btn">cancel</button>' +
      '</fieldset>' +
    '</form>' +
  '</div>'

module.exports = {
  content
}

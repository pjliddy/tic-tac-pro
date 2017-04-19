'use strict'

const content =
  '<div class="form-box">' +
    '<form id="sign-up">' +
      '<fieldset>' +
        '<legend>sign up</legend>' +
        '<div class="form-group">' +
          '<input type="email" class="form-control" name="credentials[email]"  id="sign-up-email" placeholder="email">' +
        '</div>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control"  name="credentials[password]" id="sign-up-password"  placeholder="password">' +
        '</div>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name="credentials[password_confirmation]" id="sign-up-password-confirm" placeholder="confirm password">' +
        '</div>' +
        '<button type="submit" class="btn btn-default pull-right">submit</button>' +
        '<button type="button" class="btn btn-link pull-right" id="auth-cancel-btn">cancel</button>' +
      '</fieldset>' +
    '</form>' +
  '</div>'

module.exports = {
  content
}

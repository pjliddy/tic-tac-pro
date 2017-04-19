'use strict'

const content =
  '<div class="form-box">' +
    '<form id="change-password">' +
      '<fieldset>' +
        '<legend>change password</legend>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name="passwords[old]" id="change-password-old" placeholder="old password" value="">' +
        '</div>' +
        '<div class="form-group">' +
          '<input type="password" class="form-control" name="passwords[new]" id="change-password-new" placeholder="new password" value="">' +
        '</div>' +
        '<button type="submit" class="btn btn-default pull-right">submit</button>' +
        '<button type="button" class="btn btn-link pull-right" id="change-password-cancel-btn">cancel</button>' +
      '</fieldset>' +
    '</form>' +
  '</div>'

module.exports = {
  content
}

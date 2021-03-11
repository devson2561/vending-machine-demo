'use strict';
const app = require('../server');

module.exports = function (Useraccount) {
  Useraccount.setupPassword = function (
    ctx,
    email,
    oldPassword,
    newPassword,
    cb
  ) {
    var newErrMsg, newErr;
    try {
      this.findOne(
        { where: { id: ctx.req.accessToken.userId, email: email } },
        function (err, user) {
          if (err) {
            cb(err);
          } else if (!user) {
            newErrMsg =
              'No match between provided current logged user and email';
            newErr = new Error(newErrMsg);
            newErr.statusCode = 401;
            newErr.code = 'LOGIN_FAILED_EMAIL';
            cb(newErr);
          } else {
            user.hasPassword(oldPassword, function (err, isMatch) {
              if (isMatch) {
                user.updateAttributes(
                  { password: newPassword },
                  async (err) => {
                    if (err) {
                      cb(err);
                    } else {
                      cb(null, true);
                    }
                  }
                );
              } else {
                newErrMsg = 'User specified wrong current password !';
                newErr = new Error(newErrMsg);
                newErr.statusCode = 401;
                newErr.code = 'LOGIN_FAILED_PWD';
                return cb(newErr);
              }
            });
          }
        }
      );
    } catch (err) {
      console.error(err);
      cb(err);
    }
  };

  Useraccount.remoteMethod('setupPassword', {
    description: 'Allows a logged user to change his/her password.',
    http: { verb: 'put' },
    accepts: [
      { arg: 'ctx', type: 'object', http: { source: 'context' } },
      {
        arg: 'email',
        type: 'string',
        required: true,
        description: 'The user email, just for verification',
      },
      {
        arg: 'oldPassword',
        type: 'string',
        required: true,
        description: 'The user old password',
      },
      {
        arg: 'newPassword',
        type: 'string',
        required: true,
        description: 'The user NEW password',
      },
    ],
    returns: { arg: 'passwordChange', type: 'boolean' },
  });
};

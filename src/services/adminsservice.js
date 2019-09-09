const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const exec = require('child_process').exec;

const { QueuingError } = require('@helpers/error.js');
const { status } = require('@helpers/http.js');

class AdminsService {
  constructor() {
    this.passwordFile = path.join(
      __dirname, '..', '..', 'config', 'passwd'
    );
  }

  updatePassword(body) {
    const data = this._sanitizeParams(body);
    const saltRounds = 10;
    const myPlaintextPassword = data.password;

    return bcrypt.hash(myPlaintextPassword, saltRounds)
      .then(hash => {
        exec(`touch ${this.passwordFile}`);

        fs.writeFile(this.passwordFile, hash, err => {
          if (err)
            throw new QueuingError(
              'AdminsService::updatePassword()',
              err.Error,
              status.INTERNAL_SERVER_ERROR
            );

          console.log('Password successfully updated.');
        });
      });
  }

  authenticate(body) {
    const data = this._sanitizeParams(body);
    const hash = fs.readFileSync(this.passwordFile, 'utf8');

    return bcrypt.compare(data.password, hash)
      .then(res => {
        if(!res)
          throw new QueuingError(
            'AdminsService::authenticate()',
            'Invalid password',
            status.UNAUTHORIZED
          )

        return res;
      });
  }

  // PRIVATE METHODS

  _sanitizeParams(body) {
    if (!body.admin)
      throw new QueuingError(
        'AdminsService::_sanitizeParams()',
        'admin object is missing',
        status.BAD_REQUEST
      );

    const data = body.admin;
    const permitted = [
      'password',
    ];

    for (const field in data)
      if (!permitted.includes(field))
        delete data[field];

    return data;
  }
}

module.exports = AdminsService;

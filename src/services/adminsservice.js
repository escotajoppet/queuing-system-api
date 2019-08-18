const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const exec = require('child_process').exec;

const QueuingError = require('@helpers/error.js');
const { status } = require('@helpers/http.js');

class AdminsService {
  constructor() {
    this.passwordFile = path.join(
      __dirname, '..', '..', 'config', 'passwd'
    );
  }

  updatePassword(data) {
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

  authenticate(data) {
    const hash = fs.readFileSync(this.passwordFile, 'utf8');

    return bcrypt.compare(data.password, hash)
      .then(res => res);
  }
}

module.exports = AdminsService;

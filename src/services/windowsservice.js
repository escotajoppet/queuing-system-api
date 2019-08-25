const { QueuingError } = require('@helpers/error.js');
const { status } = require('@helpers/http.js');

class WindowsService {
  constructor(resources) {
    this.models = resources.queuingDb.models;
    this.Window = this.models.window;
  }

  getAll() {
    return this.Window.findAll({
      raw: true,
    }).then(windows => windows);
  }

  getOne(id) {
    return this.Window.findByPk(id)
      .then(window => {
        if (!window)
          throw new QueuingError(
            'WindowsService::getOne()',
            `No Windows found: ${id}`,
            status.NOT_FOUND
          );

        return window;
      });
  }

  create(body) {
    return this.Window.create(this._sanitizeParams(body))
      .then(window => window);
  }

  update(id, body) {
    return this.getOne(id)
      .then(window => window.update(this._sanitizeParams(body)))
      .then(window => window);
  }

  delete(id) {
    return this.getOne(id)
      .then(window => window.destroy());
  }

  approve(id) {
    return this.update(id, {
      status: 'approved',
    })
      .then(window => {
        return {
          authenticationCode: window.authenticationCode,
        };
      });
  }

  reject(id) {
    return this.update(id, {
      status: 'rejected',
    })
      .then(window => {
        return {
          message: `Window '${id}' request is rejected`,
        };
      });
  }

  // PRIVATE METHODS

  _sanitizeParams(body) {
    if (!body.window)
      throw new QueuingError(
        'WindowsServices::_sanitizeParams()',
        'window object is missing',
        status.BAD_REQUEST
      );

    const data = body.window;
    const permitted = [
      'name',
      'functionId',
    ];

    for (const field in data)
      if (!permitted.includes(field))
        delete data[field];

    return data;
  }
}

module.exports = WindowsService;

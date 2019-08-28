const { QueuingError } = require('@helpers/error.js');
const { status } = require('@helpers/http.js');

class FunctionsService {
  constructor(resources) {
    this.models = resources.queuingDb.models;
    this.Function = this.models.function;
  }

  getAll() {
    return this.Function.findAll({
      raw: true,
    }).then(functions => functions);
  }

  getOne(id) {
    return this.Function.findByPk(id)
      .then(functionMod => {
        if (!functionMod)
          throw new QueuingError(
            'FunctionsService::getOne()',
            `No Functions found: ${id}`,
            status.NOT_FOUND
          );

        return functionMod;
      });
  }

  create(body) {
    return this.Function.create(this._sanitizeParams(body))
      .then(functionMod => functionMod);
  }

  update(id, body) {
    return this.getOne(id)
      .then(functionMod => {
        return functionMod.update(this._sanitizeParams(body));
      })
      .then(functionMod => functionMod);
  }

  delete(id) {
    return this.getOne(id)
      .then(functionMod => {
        return functionMod.destroy();
      });
  }

  // PRIVATE METHODS

  _sanitizeParams(body) {
    if (!body.function)
      throw new QueuingError(
        'FunctionsService::_sanitizeParams()',
        'function object is missing',
        status.BAD_REQUEST
      );

    const data = body.function;
    const permitted = [
      'name',
    ];

    for (const field in data)
      if (!permitted.includes(field))
        delete data[field];

    return data;
  }
}

module.exports = FunctionsService;

const QueuingError = require('@helpers/error.js');
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

  create(data) {
    return this.Function.create(data)
      .then(functionMod => functionMod);
  }

  update(id, data) {
    return this.getOne(id)
      .then(functionMod => {
        return functionMod.update(data);
      })
      .then(functionMod => functionMod);
  }

  delete(id) {
    return this.getOne(id)
      .then(functionMod => {
        return functionMod.destroy();
      });
  }
}

module.exports = FunctionsService;

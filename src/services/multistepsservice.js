const { QueuingError } = require('@helpers/error.js');
const { status } = require('@helpers/http.js');

class MultiStepsService {
  constructor(resources) {
    this.models = resources.queuingDb.models;
    this.MultiStep = this.models.multistep;
    this.Function = this.models.function;
  }

  getAll() {
    return this.MultiStep.findAll({
      include: [
        { model: this.Function },
      ],
    }).then(multisteps => multisteps);
  }

  getOne(id) {
    return this.MultiStep.findByPk(id, {
      include: [
        { model: this.Function },
      ],
    })
      .then(multistep => {
        if (!multistep)
          throw new QueuingError(
            'multistep::getOne()',
            `No MultiSteps found: ${id}`,
            status.NOT_FOUND
          );

        return multistep;
      });
  }

  create(body) {
    return this.MultiStep.create(this._sanitizeParams(body))
      .then(multistep => multistep);
  }

  update(id, body) {
    return this.getOne(id)
      .then(multistep => {
        return multistep.update(this._sanitizeParams(body));
      })
      .then(multistep => multistep);
  }

  delete(id) {
    return this.getOne(id)
      .then(multistep => {
        return multistep.destroy();
      });
  }

  // PRIVATE METHODS

  _sanitizeParams(body) {
    if (!body.multistep)
      throw new QueuingError(
        'MultistepsServices::_sanitizeParams()',
        'multistep object is missing',
        status.BAD_REQUEST
      );

    const data = body.multistep;
    const permitted = [
      'name',
    ];

    for (const field in data)
      if (!permitted.includes(field))
        delete data[field];

    return data;
  }
}

module.exports = MultiStepsService;

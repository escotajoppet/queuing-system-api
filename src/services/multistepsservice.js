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

  create(data) {
    return this.MultiStep.create(data)
      .then(multistep => multistep);
  }

  update(id, data) {
    return this.getOne(id)
      .then(multistep => {
        return multistep.update(data);
      })
      .then(multistep => multistep);
  }

  delete(id) {
    return this.getOne(id)
      .then(multistep => {
        return multistep.destroy();
      });
  }
}

module.exports = MultiStepsService;

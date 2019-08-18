const { QueuingError } = require('@helpers/error.js');
const { status } = require('@helpers/http.js');

class MultiStepFunctionsService {
  constructor(resources) {
    this.models = resources.queuingDb.models;
    this.MultiStepFunction = this.models.multistepfunction;
  }

  validate(field, data) {
    switch (field) {
      case 'order':
        return this.MultiStepFunction.count({
          where: data,
        })
          .then(count => {
            if (count > 0)
              throw new QueuingError(
                'MultiStepFunctionsService::validate()',
                'Order already exists',
                status.CONFLICT
              );

            return true;
          });
    }
  }

  getOne(id) {
    return this.MultiStepFunction.findByPk(id)
      .then(multistepfunction => {
        if (!multistepfunction)
          throw new QueuingError(
            'MultiStepFunctionsService::getOne()',
            `No MultiStepFunctions found: ${id}`,
            status.NOT_FOUND
          );

        return multistepfunction;
      });
  }

  async create(data) {
    await this.validate('order', data);

    return this.MultiStepFunction.create(data)
      .then(multistepfunction => multistepfunction);
  }

  delete(id) {
    return this.getOne(id)
      .then(multistepfunction => {
        return multistepfunction.destroy();
      });
  }
}

module.exports = MultiStepFunctionsService;

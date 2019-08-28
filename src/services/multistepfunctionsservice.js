const { QueuingError } = require('@helpers/error.js');
const { status } = require('@helpers/http.js');

class MultiStepFunctionsService {
  constructor(resources) {
    this.models = resources.queuingDb.models;
    this.MultiStepFunction = this.models.multistepfunction;

    process.nextTick(_ => {
      this.MultiStepsService = resources.services.MultiStepsService;
      this.FunctionsService = resources.services.FunctionsService;
    });
  }

  getOne(data) {
    return this.MultiStepFunction.findOne({
      ...data,
    })
      .then(multistepfunction => {
        if (!multistepfunction)
          throw new QueuingError(
            'MultiStepFunctionsService::getOne()',
            'No MultiStepFunctions found: multistepId: ' +
            `${data.multistepId} & functionId: ${data.functionId}`,
            status.NOT_FOUND
          );

        return multistepfunction;
      });
  }

  create(params, body) {
    return this._sanitizeParams(params, body)
      .then(data => {
        return this.MultiStepFunction.create(data);
      })
      .then(multistepfunction => multistepfunction);
  }

  delete(params) {
    return this._sanitizeParams(params, {
      multistepfunction: {},
    }).then(data => {
      return this.getOne(data)
        .then(multistepfunction => {
          return multistepfunction.destroy();
        });
    });
  }

  // PRIVATE METHODS

  async _sanitizeParams(params, body) {
    if (!body.multistepfunction)
      throw new QueuingError(
        'MultistepFunctionsServices::_sanitizeParams()',
        'multistepfunction object is missing',
        status.BAD_REQUEST
      );

    const data = {
      ...body.multistepfunction,
      ...params,
    };
    const permitted = [
      'order',
      'multistepId',
      'functionId',
    ];

    for (const field in data)
      if (!permitted.includes(field))
        delete data[field];
      else
        await this._validate(field, data);

    return data;
  }

  async _validate(field, data) {
    switch (field) {
      case 'order':
        if (isNaN(data.order))
          throw new QueuingError(
            'MultistepFunctionsService::_validate()',
            'order is invalid',
            status.BAD_REQUEST
          );

        await this.MultiStepFunction.count({
          where: data,
        })
          .then(count => {
            if (count > 0)
              throw new QueuingError(
                'MultiStepFunctionsService::_validate()',
                'Order already exists',
                status.CONFLICT
              );
          });

        break;
      case 'multistepId':
      case 'functionId':
        await this.FunctionsService.getOne(data[field]);

        break;
    }
  }
}

module.exports = MultiStepFunctionsService;

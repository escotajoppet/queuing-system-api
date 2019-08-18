const {
  status,
  dispatch,
} = require('@helpers/http.js');
const {
  QueuingError,
  dispatchErrorResponse,
} = require('@helpers/error.js');

module.exports = (app, resources) => {
  const {
    MultiStepsService,
    MultiStepFunctionsService,
  } = resources.services;

  app.get('/api/v1/multi-steps', async(req, res) => {
    try {
      const data = await MultiStepsService.getAll();

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post('/api/v1/multi-steps', async(req, res) => {
    try {
      if (!req.body.multistep)
        throw new QueuingError(
          'routes::multisteps:POST:/api/v1/multi-steps',
          'multistep object is required',
          status.BAD_REQUEST
        );

      const data = await MultiStepsService.create(req.body.multistep);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.get('/api/v1/multi-steps/:id', async(req, res) => {
    try {
      const data = await MultiStepsService.getOne(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.patch('/api/v1/multi-steps/:id', async(req, res) => {
    try {
      if (!req.body.multistep)
        throw new QueuingError(
          'routes::multisteps:PATCH:/api/v1/multi-steps/:id',
          'multistep object is required',
          status.BAD_REQUEST
        );

      const data = await MultiStepsService.update(
        req.params.id,
        req.body.multistep
      );

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.delete('/api/v1/multi-steps/:id', async(req, res) => {
    try {
      const data = await MultiStepsService.delete(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post(
    '/api/v1/multi-steps/:id/functions/:functionId',
    async(req, res) => {
      try {
        if (!req.body.multistepfunction)
          throw new QueuingError(
            'routes::multisteps:POST:' +
            '/api/v1/multi-steps/:id/functions/:functionId',
            'multistepfunction object is required',
            status.BAD_REQUEST
          );

        const order = req.body.multistepfunction.order;

        if (isNaN(order))
          throw new QueuingError(
            'routes::multisteps:POST:' +
            '/api/v1/multi-steps/:id/functions/:functionId',
            'order field is invalid',
            status.BAD_REQUEST
          );

        const data = await MultiStepFunctionsService.create({
          multistepId: req.params.id,
          functionId: req.params.functionId,
          order: parseInt(order, 10),
        });

        res.status(status.CREATED).send(dispatch({ data }));
      } catch (err) {
        dispatchErrorResponse(res, err);
      }
    });
};

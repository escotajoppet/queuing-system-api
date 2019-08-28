const {
  status,
  dispatch,
} = require('@helpers/http.js');
const {
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
      const data = await MultiStepsService.create(req.body);

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
      const data = await MultiStepsService.update(
        req.params.id,
        req.body
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
    '/api/v1/multi-steps/:multistepId/functions/:functionId',
    async(req, res) => {
      try {
        const data = await MultiStepFunctionsService.create(
          req.params,
          req.body
        );

        res.status(status.CREATED).send(dispatch({ data }));
      } catch (err) {
        dispatchErrorResponse(res, err);
      }
    });

  app.delete(
    '/api/v1/multi-steps/:multistepId/functions/:functionId',
    async(req, res) => {
      try {
        const data = await MultiStepFunctionsService.delete(req.params);

        res.status(status.OK).send(dispatch({ data }));
      } catch (err) {
        dispatchErrorResponse(res, err);
      }
    });
};

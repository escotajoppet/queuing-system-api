const {
  status,
  dispatch,
} = require('@helpers/http.js');
const {
  QueuingError,
  dispatchErrorResponse,
} = require('@helpers/error.js');

module.exports = (app, resources) => {
  const { FunctionsService } = resources.services;

  app.get('/api/v1/functions', async(req, res) => {
    try {
      const data = await FunctionsService.getAll();

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post('/api/v1/functions', async(req, res) => {
    try {
      if (!req.body.function)
        throw new QueuingError(
          'routes::functions:POST:/api/v1/functions',
          'function object is required',
          status.BAD_REQUEST
        );

      const data = await FunctionsService.create(req.body.function);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.get('/api/v1/functions/:id', async(req, res) => {
    try {
      const data = await FunctionsService.getOne(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.patch('/api/v1/functions/:id', async(req, res) => {
    try {
      if (!req.body.function)
        throw new QueuingError(
          'routes::functions:PATCH:/api/v1/functions/:id',
          'function object is required',
          status.BAD_REQUEST
        );

      const data = await FunctionsService.update(
        req.params.id,
        req.body.function
      );

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.delete('/api/v1/functions/:id', async(req, res) => {
    try {
      const data = await FunctionsService.delete(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });
};

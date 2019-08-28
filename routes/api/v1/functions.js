const {
  status,
  dispatch,
} = require('@helpers/http.js');
const {
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
      const data = await FunctionsService.create(req.body);

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
      const data = await FunctionsService.update(
        req.params.id,
        req.body
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

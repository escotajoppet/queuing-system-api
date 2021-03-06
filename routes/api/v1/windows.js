const {
  status,
  dispatch,
} = require('@helpers/http.js');
const {
  dispatchErrorResponse,
} = require('@helpers/error.js');

module.exports = (app, resources) => {
  const { WindowsService } = resources.services;

  app.get('/api/v1/windows', async(req, res) => {
    try {
      const data = await WindowsService.getAll();

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post('/api/v1/windows', async(req, res) => {
    try {
      const data = await WindowsService.create(req.body);

      res.status(status.CREATED).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.get('/api/v1/windows/:id', async(req, res) => {
    try {
      const data = await WindowsService.getOne(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.patch('/api/v1/windows/:id', async(req, res) => {
    try {
      const data = await WindowsService.update(
        req.params.id,
        req.body
      );

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.delete('/api/v1/windows/:id', async(req, res) => {
    try {
      const data = await WindowsService.delete(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post('/api/v1/windows/:id/approve', async(req, res) => {
    try {
      const data = await WindowsService.approve(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post('/api/v1/windows/:id/reject', async(req, res) => {
    try {
      const data = await WindowsService.reject(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });
};

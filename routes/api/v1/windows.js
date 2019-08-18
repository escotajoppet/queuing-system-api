const {
  status,
  dispatch,
} = require('@helpers/http.js');
const {
  QueuingError,
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
      if (!req.body.window)
        throw new QueuingError(
          'routes::windows:POST:/api/v1/windows',
          'window object is missing',
          status.BAD_REQUEST
        );

      const data = await WindowsService.create(req.body.window);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.get('/api/v1/windows/:id', async(req, res) => {
    try {
      const data = await WindowsService.getOne(req.params.id);

      if (!data)
        throw new QueuingError(
          'WindowsService::getOne()',
          `No windows found: ${req.params.id}`,
          status.NOT_FOUND
        );

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.patch('/api/v1/windows/:id', async(req, res) => {
    try {
      if (!req.body.window)
        throw new QueuingError(
          'routes::windows:PATCH:/api/v1/windows/:id',
          'window object is missing',
          status.BAD_REQUEST
        );

      const data = await WindowsService.update(
        req.params.id,
        req.body.window
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

  app.post('/api/v1/windows/approve', async(req, res) => {
    try {
      if (!req.body.window)
        throw new QueuingError(
          'routes::windows:PATCH:/api/v1/windows/approve',
          'window object is missing',
          status.BAD_REQUEST
        );

      const data = await WindowsService.approve(req.body.window.name);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post('/api/v1/windows/reject', async(req, res) => {
    try {
      if (!req.body.window)
        throw new QueuingError(
          'routes::windows:PATCH:/api/v1/windows/reject',
          'window object is missing',
          status.BAD_REQUEST
        );

      const data = await WindowsService.reject(req.body.window.name);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });
};

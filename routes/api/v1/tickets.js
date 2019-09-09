const {
  status,
  dispatch,
} = require('@helpers/http.js');

module.exports = (app, resources) => {
  const { TicketsService } = resources.services;

  app.get('/api/v1/tickets', async(req, res, next) => {
    try {
      const data = await TicketsService.getAll();

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/v1/tickets', async(req, res, next) => {
    try {
      const data = await TicketsService.create(req.body);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/v1/tickets/:id', async(req, res, next) => {
    try {
      const data = await TicketsService.getOne(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      next(err);
    }
  });

  app.patch('/api/v1/tickets/:id', async(req, res, next) => {
    try {
      const data = await TicketsService.update(
        req.params.id,
        req.body
      );

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      next(err);
    }
  });

  app.delete('/api/v1/tickets/:id', async(req, res, next) => {
    try {
      const data = await TicketsService.delete(req.params.id);

      res.status(status.OK).send(dispatch({ data }));
    } catch (err) {
      next(err);
    }
  });
};

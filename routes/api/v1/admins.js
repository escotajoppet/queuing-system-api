const {
  status,
  dispatch,
} = require('@helpers/http.js');

module.exports = (app, resources) => {
  const { AdminsService } = resources.services;

  app.patch('/api/v1/admin/password', async(req, res, next) => {
    try {
      await AdminsService.updatePassword(req.body);

      res.status(status.OK).send(dispatch());
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/v1/admin/authenticate', async(req, res, next) => {
    try {
      await AdminsService.authenticate(req.body);

      res.status(status.OK).send(
        dispatch({
          success: true,
        })
      );
    } catch (err) {
      next(err);
    }
  });
};

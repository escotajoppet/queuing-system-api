const {
  status,
  dispatch,
} = require('@helpers/http.js');
const {
  dispatchErrorResponse,
} = require('@helpers/error.js');

module.exports = (app, resources) => {
  const { AdminsService } = resources.services;

  app.patch('/api/v1/admin/password', async(req, res) => {
    try {
      await AdminsService.updatePassword(req.body);

      res.status(status.OK).send(dispatch());
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post('/api/v1/admin/authenticate', async(req, res) => {
    try {
      const authenticated = await AdminsService.authenticate(req.body);

      if (authenticated)
        res.status(status.OK).send(
          dispatch({
            success: true,
          })
        );
      else
        res.status(status.UNAUTHORIZED).send(
          dispatch({
            success: false,
            error: 'Invalid password',
          })
        );
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });
};

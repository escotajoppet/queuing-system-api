const {
  status,
  dispatch,
} = require('@helpers/http.js');
const {
  QueuingError,
  dispatchErrorResponse,
} = require('@helpers/error.js');

module.exports = (app, resources) => {
  const { AdminsService } = resources.services;

  app.patch('/api/v1/admin/password', async(req, res) => {
    try {
      if (!req.body.admin)
        throw new QueuingError(
          'routes::admins:PATCH:/api/v1/admin/password',
          'admin object is missing',
          status.BAD_REQUEST
        );

      await AdminsService.updatePassword(req.body.admin);

      res.status(status.OK).send(
        dispatch({
          data: {
            message: 'Password successfully updated.',
          },
        })
      );
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });

  app.post('/api/v1/admin/authenticate', async(req, res) => {
    try {
      if (!req.body.admin)
        throw new QueuingError(
          'routes::admins:PATCH:/api/v1/admin/authenticate',
          'admin object is missing',
          status.BAD_REQUEST
        );

      const authenticated = await AdminsService.authenticate(req.body.admin);

      const data = authenticated ? {
        success: true,
      } : {
        success: false,
        error: 'Invalid password',
      };

      res.status(status.OK).send(dispatch(data));
    } catch (err) {
      dispatchErrorResponse(res, err);
    }
  });
};

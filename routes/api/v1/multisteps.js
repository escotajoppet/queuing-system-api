const {
  status,
  dispatch,
} = require('@helpers/http.js');

module.exports = (app, models) => {
  app.get('/api/v1/multi-steps', (req, res) => {
    res.status(status.OK).send(
      dispatch({
        data: {
          naknang: 'patatas',
        },
      })
    );
  });

  app.post('/api/v1/multi-steps', (req, res) => {
    res.status(status.CREATED).send(
      dispatch({
        data: {
          naknang: 'patatas2',
        },
      })
    );
  });

  app.get('/api/v1/multi-steps/:id', (req, res) => {
    res.status(status.OK).send(
      dispatch({
        data: {
          naknang: 'patatas3',
        },
      })
    );
  });

  app.patch('/api/v1/multi-steps/:id', (req, res) => {
    res.status(status.OK).send(
      dispatch({
        data: {
          naknang: 'patatas4',
        },
      })
    );
  });

  app.delete('/api/v1/multi-steps/:id', (req, res) => {
    res.status(status.OK).send(
      dispatch({
        data: {
          naknang: 'patatas5',
        },
      })
    );
  });
};

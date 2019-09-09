const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { status, dispatch } = require('@helpers/http.js');

// Set up the express app
module.exports = {
  load: resources => {
    const PORT = 3001;
    const app = express();

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    const addRoute = (version, route) => {
      const name = `${version}/${route.split('/').pop().split('.')[0]}`;

      console.log(`Adding route: ${name}`);

      require(route)(app, resources);
    };

    const routePath = path.join(__dirname, 'api');

    fs
      .readdirSync(routePath)
      .filter(version => {
        const routeFiles = fs
          .readdirSync(`${routePath}/${version}`);

        for (const file of routeFiles)
          addRoute(version, `${routePath}/${version}/${file}`);
      });

    app.use((err, req, res, next) => {
      res.status(err.status).send(
        dispatch({
          success: false,
          status: err.status || status.INTERNAL_SERVER_ERROR,
          error: err.message || status[err.status],
        })
      );
    });

    app.listen(PORT, _ => {
      console.log(`\nQueuing server running on port ${PORT}...`);
    });
  },
};

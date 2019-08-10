const express = require('express');
const fs = require('fs');
const path = require('path');
// const basename = path.basename(__filename);

// Set up the express app
module.exports = {
  load: _ => {
    const app = express();
    const PORT = 3001;

    const addRoute = (version, route) => {
      const name = `${version}/${route.split('/').pop().split('.')[0]}`;

      console.log(`Adding route: ${name}`);

      require(route)(app);
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

    app.listen(PORT, _ => {
      console.log(`server running on port ${PORT}`);
    });
  },
};

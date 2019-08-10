const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('config', 'seeders'),
  'migrations-path': path.resolve('database', 'migrations'),
}

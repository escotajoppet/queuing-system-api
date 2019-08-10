class Queuing {
  constructor() {
    this.resources = {};
  }

  load() {
    this._loadResources();
    this._loadServices();
    this._loadRoutes();
  }

  // private methods

  _loadResources() {
    this.resources.queuingDb = require('@database/connection.js');

    const models = require('@database/models.js');

    this.resources.queuingDb.models = models.load(this.resources.queuingDb);
  }

  _loadServices() {
    const services = require('./services.js');

    this.resources.services = services.load(this.resources);
  }

  _loadRoutes() {
    const router = require('@routes');
    router.load(this.resources);
  }
};

module.exports = Queuing;

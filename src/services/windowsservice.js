const Op = require('sequelize').Op;

class WindowsService {
  constructor(resources) {
    this.models = resources.queuingDb.models;
    this.Window = this.models.window;
  }

  getAll() {
    return this.Window.findAll({
      raw: true,
    }).then(windows => windows);
  }

  getOne(identifier) {
    return this.Window.findOne({
      where: {
        [Op.or]: [
          { name: identifier },
          { id: identifier },
        ],
      },
    })
      .then(window => window);
  }

  create(data) {
    return this.Window.create(data)
      .then(window => window);
  }

  update(identifier, data) {
    return this.getOne(identifier)
      .then(window => {
        return window.update(data);
      })
      .then(window => window);
  }

  delete(id) {
    return this.getOne(id)
      .then(window => {
        return window.destroy();
      });
  }

  approve(identifier) {
    return this.update(identifier, {
      status: 'approved',
    })
      .then(window => {
        return {
          authenticationCode: window.authenticationCode,
        };
      });
  }

  reject(identifier) {
    return this.update(identifier, {
      status: 'rejected',
    })
      .then(window => {
        return {
          message: `Window name '${identifier}' request is rejected`,
        };
      });
  }
}

module.exports = WindowsService;

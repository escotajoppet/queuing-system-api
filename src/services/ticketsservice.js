const { QueuingError } = require('@helpers/error.js');
const { status } = require('@helpers/http.js');
const Op = require('sequelize').Op;

class TicketsService {
  constructor(resources) {
    this.models = resources.queuingDb.models;
    this.Ticket = this.models.ticket;

    process.nextTick(_ => {
      this.FunctionsService = resources.services.FunctionsService;
    });
  }

  getAll() {
    return this.Ticket.findAll({
      raw: true,
    }).then(tickets => tickets);
  }

  getOne(identifier) {
    return this.Ticket.findOne({
      where: {
        [Op.or]: [
          { barcode: identifier },
          { id: identifier },
        ],
      },
    })
      .then(ticket => {
        if (!ticket)
          throw new QueuingError(
            'TicketsService::getOne()',
            `No Tickets found: ${identifier}`,
            status.NOT_FOUND
          );

        return ticket;
      });
  }

  create(data) {
    return this.Ticket.create(data)
      .then(ticket => ticket);
  }

  update(id, data) {
    return this.getOne(id)
      .then(ticket => {
        return ticket.update(data);
      })
      .then(ticket => ticket);
  }

  delete(id) {
    return this.getOne(id)
      .then(ticket => {
        return ticket.destroy();
      });
  }

  // PRIVATE METHODS

  async _sanitizeParams(body) {
    if (!body.ticket)
      throw new QueuingError(
        'TicketsService::_sanitizeParams()',
        'ticket object is missing',
        status.BAD_REQUEST
      );

    const data = body.ticket;
    const permitted = [
      'classification',
      'barcode',
      'functionId',
    ];

    for (const field in data)
      if (!permitted.includes(field))
        delete data[field];
      else
        await this._validate(field, data);

    return data;
  }

  async _validate(field, data) {
    switch (field) {
      case 'functionId':
        await this.FunctionsService.getOne(data[field]);

        break;
    }
  }
}

module.exports = TicketsService;

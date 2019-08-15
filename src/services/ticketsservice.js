const QueuingError = require('@helpers/error.js');
const { status } = require('@helpers/http.js');

class TicketsService {
  constructor(resources) {
    this.models = resources.queuingDb.models;
    this.Ticket = this.models.ticket;
  }

  getAll() {
    return this.Ticket.findAll({
      raw: true,
    }).then(tickets => tickets);
  }

  getOne(id) {
    return this.Ticket.findByPk(id)
      .then(ticket => {
        if (!ticket)
          throw new QueuingError(
            'TicketsService::getOne()',
            `No Tickets found: ${id}`,
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
}

module.exports = TicketsService;

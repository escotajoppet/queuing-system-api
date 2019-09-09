class QueuingError extends Error {
  constructor(name, message, status) {
    super(message);

    this.name = name;
    this.message = message;
    this.status = status;
  }
}

module.exports = {
  QueuingError,
};

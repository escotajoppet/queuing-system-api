const { status, dispatch } = require('@helpers/http.js');

class QueuingError extends Error {
  constructor(name, message, status) {
    super(message);

    this.name = name;
    this.message = message;
    this.status = status;
  }
}

const dispatchErrorResponse = (res, err) => {
  const httpStatus = err.status || status.INTERNAL_SERVER_ERROR;

  const error = process.env.ENV === 'development' ?
    `${err.name} ${err.message}` :
    err.message;

  res.status(httpStatus).send(
    dispatch({
      success: false,
      error,
    })
  );
};

module.exports = {
  QueuingError,
  dispatchErrorResponse,
};

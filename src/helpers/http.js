const status = Object.freeze({
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  CREATED: 201,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
  OK: 200,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
});

const dispatch = (obj) => {
  const defaults = {
    data: {},
    error: null,
    status: 200,
    success: true,
  };

  return {
    ...defaults,
    ...obj,
  };
};

module.exports = {
  status,
  dispatch,
};

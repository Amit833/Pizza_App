const customError = (message, STATUS = 401) => {
  const error = new Error(message);
  error.status = STATUS;

  return error;
};

module.exports = customError;

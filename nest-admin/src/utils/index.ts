export function success(data, msg) {
  return {
    code: 0,
    result: data,
    message: msg,
  };
}

export function error(msg) {
  return {
    code: -1,
    message: msg,
  };
}

export function wrapperResponse(promise, msg) {
  return promise
    .then((data) => success(data, msg))
    .catch((err) => error(err).message);
}

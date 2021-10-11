const { log } = require('./log.service');

class ResponseCode {}

ResponseCode.SUCCESS_OK = 200;
ResponseCode.SUCCESS_CREATED = 201;
ResponseCode.SUCCESS_ACCEPTED = 202;
ResponseCode.SUCCESS_NO_CONTENT = 204;

ResponseCode.BAD_REQUEST = 400;
ResponseCode.UNAUTHORIZED = 401;
ResponseCode.PAYMENT_REQUIRED = 402;
ResponseCode.FORBIDDEN = 403;
ResponseCode.NOT_FOUND = 404;
ResponseCode.METHOD_NOT_ALLOWED = 405;
ResponseCode.NOT_ACCEPTABLE = 406;
ResponseCode.REQUEST_TIMEOUT = 408;
ResponseCode.UNPROCESSABLE_ENTITY = 422;

ResponseCode.INTERNAL_SERVER_ERROR = 500;
ResponseCode.NOT_IMPLEMENTED = 501;
ResponseCode.BAD_GATEWAY = 502;
ResponseCode.SERVICE_UNAVAILABLE = 503;
ResponseCode.GATEWAY_TIMEOUT = 504;

module.exports.ResponseCode = ResponseCode;

/**
 * Response Error
 * @param res
 * @param err
 * @param code
 * @param additionalParams (optional)
 * @returns {*}
 * @constructor
 */
module.exports.responseError = function(res, err, code, additionalParams = {}) {
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    err = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;
  return res.json({ message: err, success: false, ...additionalParams });
};

/**
 * Response Success
 * @param res
 * @param data
 * @param code
 * @returns {*}
 * @constructor
 */
module.exports.responseSuccess = function(res, data, code) {
  let sendData = { success: true };

  if (typeof data === 'object') {
    // merge the objects
    sendData = Object.assign(data, sendData);
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(sendData);
};

/**
 * Throw Error
 * @type {throwError}
 */
module.exports.throwError = function(err_message, is_log) {
  if (is_log === true) {
    log.error(err_message);
  }

  throw new Error(err_message);
};

/**
 * Response Forbidden Error
 * @param res
 */
module.exports.responseForbiddenError = function(res) {
  res.statusCode = ResponseCode.FORBIDDEN;
  return res.json({ message: 'Forbidden' });
};

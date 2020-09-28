'use strict';

const ERROR_CODE_MAP = require('./error_code.js');

class HttpException extends Error {
  constructor(type) {
    super();
    let error = ERROR_CODE_MAP[type];
    if (!error) {
      error = {
        code: 500,
        message: 'Unknow error type',
      };
    }
    const statusCode = error.code.toString().substr(0, 3);
    this.code = error.code;
    this.message = error.message;
    this.httpCode = Number(statusCode);
  }
}

module.exports = HttpException;

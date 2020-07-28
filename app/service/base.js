'use strict';

const Service = require('egg').Service;
const HttpException = require('../exception/http_exception.js');

class BaseService extends Service {
  /**
   * throw exception
   * @param {*} exceptionCode
   */
  async createException(exceptionCode) {
    throw new HttpException(exceptionCode);
  }
}

module.exports = BaseService;

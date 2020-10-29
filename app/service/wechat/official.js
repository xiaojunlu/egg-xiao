'use strict';

const _ = require('lodash');
const BaseService = require('../base.js');
const BASE_URL = 'https://api.weixin.qq.com';
const ACCESS_TOKEN_GET = 'cgi-bin/token';

class OfficialService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.accessToken = '';
  }
  async setAccessToken(token) {
    this.accessToken = token;
  }
  async getAccessToken(config) {
    const params = {
      appid: config.appid,
      secret: config.secret,
      grant_type: 'client_credential',
    };

    const result = await this.getRequest(
      `${BASE_URL}/${ACCESS_TOKEN_GET}`,
      params
    );

    if (_.has(result, 'errmsg') && result.errmsg !== 'ok') {
      this.ctx.logger.error(
        'WECHAT_ACCESS_TOKEN_ERROR: %j %s',
        params,
        result.errmsg
      );
      return {};
      // this.ctx.logger.error(new Error(`WECHAT_ACCESS_TOKEN_ERROR error:${result.errmsg}`));
    }

    console.log(555555);

    return {
      access_token: result.access_token,
      expires_in: result.expires_in,
    };
  }
  async getRequest(url, params) {
    const result = await this.ctx.curl(url, {
      dataType: 'json',
      data: params,
    });

    return result.data;
  }
}

module.exports = OfficialService;

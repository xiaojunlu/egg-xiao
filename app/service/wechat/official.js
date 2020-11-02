'use strict';

const _ = require('lodash');
const BaseService = require('../base.js');

const BASE_URL = 'https://api.weixin.qq.com';
const ACCESS_TOKEN_GET = 'cgi-bin/token';
const QRCODE_CREATE = 'cgi-bin/qrcode/create';
const MENU_LIST_GET = 'cgi-bin/menu/get';
const CURRENT_MENU_GET = 'cgi-bin/get_current_selfmenu_info';
const MENU_CREATE = 'cgi-bin/menu/create';
const MENU_DELETE = 'cgi-bin/menu/delete';
const CONDITIONAL_MENU_CREATE = 'cgi-bin/menu/addconditional';
const CONDITIONAL_MENU_DELETE = 'cgi-bin/menu/delconditional';

const DAY = 86400;
const SCENE_MAX_VALUE = 100000;
const SCENE_QR_TEMPORARY = 'QR_SCENE';
const SCENE_QR_TEMPORARY_STR = 'QR_STR_SCENE';
const SCENE_QR_FOREVER = 'QR_LIMIT_SCENE';
const SCENE_QR_FOREVER_STR = 'QR_LIMIT_STR_SCENE';

class OfficialService extends BaseService {
  /**
   * 获取接口调用凭据
   * @param {*} config 配置
   */
  async getAccessToken(config) {
    const { ctx, app } = this;
    const params = {
      appid: config.appid,
      secret: config.secret,
      grant_type: 'client_credential',
    };

    const key = `service:wechat:official:getAccessToken:${JSON.stringify(
      params
    )}`;
    // 命中 cache, 直接返回 cache 数据
    const cache = await app.redis.get(key);
    if (cache) {
      return cache;
    }

    const result = await this.getRequest(
      `${BASE_URL}/${ACCESS_TOKEN_GET}`,
      params
    );

    if (_.has(result, 'errmsg') && result.errmsg !== 'ok') {
      ctx.logger.error(
        new Error(`params:${JSON.stringify(params)} error:${result.errmsg}`)
      );
      return {};
    }

    await app.redis.set(key, result.access_token, 'EX', result.expires_in);

    return result.access_token;
  }

  /**
   * 创建临时二维码
   * @param {*} accessToken     接口调用凭据
   * @param {*} sceneValue      场景值
   * @param {*} expireSeconds   有效时间，以秒为单位。 最大不超过2592000（即30天）
   */
  async createTempQrcode(accessToken, sceneValue, expireSeconds) {
    let type = '';
    let sceneKey = '';
    if (_.isInteger(sceneValue)) {
      type = SCENE_QR_TEMPORARY;
      sceneKey = 'scene_id';
    } else {
      type = SCENE_QR_TEMPORARY_STR;
      sceneKey = 'scene_str';
    }
    const scene = {
      [sceneKey]: sceneValue,
    };
    const result = await this.createQrcode(
      accessToken,
      type,
      scene,
      true,
      expireSeconds
    );
    return result;
  }

  /**
   * 创建永久二维码
   * @param {*} accessToken 接口调用凭据
   * @param {*} sceneValue  场景值
   */
  async createForeverQrcode(accessToken, sceneValue) {
    let type = '';
    let sceneKey = '';
    if (
      _.isInteger(sceneValue) &&
      sceneValue > 0 &&
      sceneValue < SCENE_MAX_VALUE
    ) {
      type = SCENE_QR_FOREVER;
      sceneKey = 'scene_id';
    } else {
      type = SCENE_QR_FOREVER_STR;
      sceneKey = 'scene_str';
    }

    const scene = {
      [sceneKey]: sceneValue,
    };
    const result = await this.createQrcode(accessToken, type, scene, false);
    return result;
  }

  async createQrcode(
    accessToken,
    actionName,
    actionInfo,
    temporary = true,
    expireSeconds = null
  ) {
    const { ctx } = this;
    if (_.isNull(expireSeconds)) {
      expireSeconds = 7 * DAY;
    }

    const params = {
      action_name: actionName,
      action_info: { scene: actionInfo },
    };

    if (temporary) {
      params.expire_seconds = _.min([ expireSeconds, 30 * DAY ]);
    }

    const result = await this.postRequest(
      `${BASE_URL}/${QRCODE_CREATE}?access_token=${accessToken}`,
      params
    );

    if (_.has(result, 'errmsg') && result.errmsg !== 'ok') {
      ctx.logger.error(
        new Error(`params:${JSON.stringify(params)} error:${result.errmsg}`)
      );
      return {};
    }

    return result;
  }

  /**
   * 查询已设置菜单
   * @param {*} accessToken 接口调用凭据
   */
  async getMenuList(accessToken) {
    const { ctx } = this;
    const result = await this.getRequest(
      `${BASE_URL}/${MENU_LIST_GET}?access_token=${accessToken}`
    );

    if (_.has(result, 'errmsg') && result.errmsg !== 'ok') {
      ctx.logger.error(new Error(`error:${result.errmsg}`));
      return {};
    }

    return result;
  }

  /**
   * 获取当前菜单
   * @param {*} accessToken 接口调用凭据
   */
  async getCurrentMenu(accessToken) {
    const { ctx } = this;
    const result = await this.getRequest(
      `${BASE_URL}/${CURRENT_MENU_GET}?access_token=${accessToken}`
    );

    if (_.has(result, 'errmsg') && result.errmsg !== 'ok') {
      ctx.logger.error(new Error(`error:${result.errmsg}`));
      return {};
    }

    return result;
  }

  /**
   * 创建自定义菜单
   * @param {*} accessToken  接口调用凭据
   * @param {*} buttons      菜单数据
   * @param {*} matchRule    个性化菜单匹配规则
   */
  async createMenu(accessToken, buttons, matchRule = {}) {
    const { ctx } = this;
    let params = {};
    let result = {};

    if (!_.isEmpty(matchRule)) {
      // 创建个性化菜单
      params = {
        button: buttons,
        matchrule: matchRule,
      };
      result = await this.postRequest(
        `${BASE_URL}/${CONDITIONAL_MENU_CREATE}?access_token=${accessToken}`,
        params
      );
    } else {
      params = {
        button: buttons,
      };
      result = await this.postRequest(
        `${BASE_URL}/${MENU_CREATE}?access_token=${accessToken}`,
        params
      );
    }

    if (_.has(result, 'errmsg') && result.errmsg !== 'ok') {
      ctx.logger.error(
        new Error(`params:${JSON.stringify(params)} error:${result.errmsg}`)
      );
      return {};
    }

    return result;
  }

  /**
   * 删除菜单
   * @param {*} accessToken  接口调用凭据
   * @param {*} menuId       菜单ID，不传时删除全部菜单
   */
  async deleteMenu(accessToken, menuId = null) {
    const { ctx } = this;
    let result = {};
    let params = {};

    if (_.isNull(menuId)) {
      result = await this.getRequest(
        `${BASE_URL}/${MENU_DELETE}?access_token=${accessToken}`
      );
    } else {
      params = {
        menuid: menuId,
      };
      result = await this.postRequest(
        `${BASE_URL}/${CONDITIONAL_MENU_DELETE}?access_token=${accessToken}`,
        params
      );
    }

    if (_.has(result, 'errmsg') && result.errmsg !== 'ok') {
      ctx.logger.error(
        new Error(`params:${JSON.stringify(params)} error:${result.errmsg}`)
      );
      return {};
    }

    return result;
  }

  async getRequest(url, params = {}) {
    const result = await this.ctx.curl(url, {
      dataType: 'json',
      contentType: 'json',
      data: params,
    });

    return result.data;
  }

  async postRequest(url, params) {
    const result = await this.ctx.curl(url, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: params,
    });

    return result.data;
  }
}

module.exports = OfficialService;

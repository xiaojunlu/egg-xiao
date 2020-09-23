'use strict';

const { Op } = require('sequelize');
const BaseService = require('../base.js');

class UserService extends BaseService {
  async getUser(id) {
    const user = await this.ctx.model.User.User.findByPk(this.ctx.helper.toInt(id));
    return user;
  }

  async createUser(formData) {
    const user = await this.ctx.model.User.User.create(formData);
    return user;
  }

  async updateUser(id) {
    const user = await this.getUser(id);
    if (!user) {
      return this.createException('NOTFOUND_USER');
    }

    return user;
  }

  async countUsers(conditions = {}) {
    const query = {
      where: await this._prepareSearchConditions(conditions),
    };

    return this.ctx.model.User.User.count(query);
  }

  /**
   * 分页获取列表
   * @param {*} conditions  条件
   * @param {*} orderBy     排序
   * @param {*} start       分页偏移值 默认为0
   * @param {*} limit       每页返回数量 默认为10
   * @param {*} columns     指定返回字段
   */
  async searchUsers(conditions = {}, orderBy = [], start, limit, columns = []) {
    const query = {
      attributes: columns.length === 0 ? '' : columns,
      where: await this._prepareSearchConditions(conditions),
      order: orderBy.length === 0 ? [[ 'id', 'DESC' ]] : orderBy,
      offset: start,
      limit,
    };

    const users = await this.ctx.model.User.User.findAll(query);

    return users;
  }

  /**
   * 查询条件处理
   * @param {*} conditions 查询条件
   */
  async _prepareSearchConditions(conditions = {}) {
    const where = {};

    if (conditions.username) {
      where.username = { [Op.like]: `%%${conditions.username}%%` };
    }

    return where;
  }
}

module.exports = UserService;

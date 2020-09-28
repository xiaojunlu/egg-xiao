'use strict';

const { now } = require('lodash');
const { Op } = require('sequelize');
const BaseService = require('../base.js');

class ArticleService extends BaseService {
  async getArticle(id) {
    const article = await this.ctx.model.Article.Article.findByPk(
      this.ctx.helper.toInt(id)
    );
    return article;
  }

  async createArticle(formData) {
    formData.created_time = now() / 1000;
    formData.updated_time = now() / 1000;
    const article = await this.ctx.model.Article.Article.create(formData);
    return article;
  }

  async updateArticle(id, formData) {
    const article = await this.getArticle(id);
    if (!article) {
      return this.createException('NOTFOUND_ARTICLE');
    }

    formData.updated_time = now() / 1000;
    return article;
  }

  async countArticles(conditions = {}) {
    const query = {
      where: await this._prepareSearchConditions(conditions),
    };

    return this.ctx.model.Article.Article.count(query);
  }

  /**
   * 分页获取列表
   * @param {*} conditions  条件
   * @param {*} orderBy     排序
   * @param {*} start       分页偏移值 默认为0
   * @param {*} limit       每页返回数量 默认为10
   * @param {*} columns     指定返回字段
   */
  async searchArticles(
    conditions = {},
    orderBy = [],
    start,
    limit,
    columns = []
  ) {
    const query = {
      attributes: columns.length === 0 ? '' : columns,
      where: await this._prepareSearchConditions(conditions),
      order: orderBy.length === 0 ? [[ 'id', 'DESC' ]] : orderBy,
      offset: start,
      limit,
    };

    const articles = await this.ctx.model.Article.Article.findAll(query);

    return articles;
  }

  /**
   * 查询条件处理
   * @param {*} conditions 查询条件
   */
  async _prepareSearchConditions(conditions = {}) {
    const where = {};

    if (conditions.title) {
      where.title = { [Op.like]: `%%${conditions.title}%%` };
    }

    return where;
  }
}

module.exports = ArticleService;

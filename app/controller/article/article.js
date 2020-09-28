'use strict';

const BaseController = require('../base.js');

class ArticleController extends BaseController {

  async search() {
    const { ctx } = this;
    const query = this.ctx.query;
    const { offset, limit } = await this.getOffsetAndLimit();
    const orderBys = await this.getSort();
    const articles = await ctx.service.article.article.searchArticles(
      query,
      orderBys,
      offset,
      limit
    );
    const total = await ctx.service.article.article.countArticles(query);
    const result = await this.makePagingObject(articles, total, offset, limit);
    ctx.body = await this.filters(result, 'article.articleFilter');
  }

  async get() {
    const { ctx } = this;
    const id = ctx.params.id;
    const article = await ctx.service.article.article.getArticle(id);
    ctx.body = await this.filter(article, 'article.articleFilter');
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    const article = await ctx.service.article.article.createArticle(params);
    ctx.body = article;
    ctx.body = 'create article';
  }

  async update() {
    const { ctx } = this;
    ctx.body = 'update article';
  }

  async remove() {
    const { ctx } = this;
    ctx.body = 'remove article';
  }
}

module.exports = ArticleController;

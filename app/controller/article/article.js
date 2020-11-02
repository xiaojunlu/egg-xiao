'use strict';

const BaseController = require('../base.js');

class ArticleController extends BaseController {

  async search() {
    const { ctx } = this;
    // 38_p-aFlYPcDEW8qB3EfQTnA6O36sV8u290a1tpbSUQZdRpSl-hqP9-BtyPWxfKigVHmXO7oiFZUahrltB3AlAGQKexGRIbybYKjGeqUKHcwpzEV0Zo5uu8j1o4n0y4E2Y7iLJb6U52sNmuXRl-XNOfAAASIJ
    ctx.body = await ctx.service.wechat.official.createTempQrcode('38_Lfdp0fr1WSTJc5JFuZBoGVBzkXL67kvnT2tzwMgDz-FW8gRA-E7Ms0-zjsphIbaoNNX0dJv7XA4UyHRfAliePfa-jimEK8nMcQOoxuYrPugx34pI6vpy_EvmkF4lmNwEJSVxAeGZPOJ0OUiAIZDfABAMDH', 1000, 3600);


    // const query = this.ctx.query;
    // const { offset, limit } = await this.getOffsetAndLimit();
    // const orderBys = await this.getSort();
    // const articles = await ctx.service.article.article.searchArticles(
    //   query,
    //   orderBys,
    //   offset,
    //   limit
    // );
    // const total = await ctx.service.article.article.countArticles(query);
    // const result = await this.makePagingObject(articles, total, offset, limit);
    // ctx.body = await this.filters(result, 'article.articleFilter');
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

'use strict';

const BaseController = require('../base.js');

class UserController extends BaseController {
  // get users list
  async index() {
    const { ctx } = this;
    const query = this.ctx.query;
    // console.log(query);

    const { offset, limit } = await this.getOffsetAndLimit();
    const orderBys = await this.getSort();
    const users = await ctx.service.user.user.searchUsers(
      query,
      orderBys,
      offset,
      limit
    );
    const total = await ctx.service.user.user.countUsers(query);
    const result = await this.makePagingObject(users, total, offset, limit);
    console.log('1111', result);
    ctx.body = await this.filters(result, 'user.userFilter');
  }

  // user detail
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    // throw new HttpException('UN_LOGIN');
    const user = await ctx.service.user.user.getUser(id);
    ctx.body = await this.filter(user, 'user.userFilter');
  }

  // create user
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate({ username: { type: 'username', require: true } }, params);
    const user = await ctx.service.user.user.createUser(params);
    ctx.body = user;
  }

  // update user
  async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.user.updateUser(30);
    //  ctx.body = 'update user';
  }

  // delete user
  async destroy() {
    const { ctx } = this;
    ctx.body = 'destroy user';
  }
}

module.exports = UserController;

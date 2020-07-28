'use strict';

const BaseController = require('../base.js');
const HttpException = require('../../exception/http_exception.js');

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
    ctx.body = await this.filters(result, 'user.userFilter');

    // ctx.body = await this.makePagingObject(users, total, offset, limit);
  }

  // user detail
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    console.log('+++++++', id);
    // throw new HttpException('UN_LOGIN');
    // ctx.throw(4030101, '用户不存在');
    const user = await ctx.service.user.user.getUser(id);
    // ctx.body = this.filter(user, 'user.userFilter');
    ctx.body = user;
  }

  // create user
  async create() {
    const { ctx } = this;
    // ctx.body = await ctx.service.user.user.createUser();
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

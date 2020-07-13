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
    const users = await ctx.service.user.user.searchUsers(query, orderBys, offset, limit);
    const total = await ctx.service.user.user.countUsers(query);

    this.filter({ username: '张三', password: 'aasdafada122' }, 'user.userFilter');

    ctx.body = await this.makePagingObject(users, total, offset, limit);
  }

  // user detail
  async show() {
    const { ctx } = this;
    const user = await ctx.service.user.user.getUser(3);
    console.log(user);
    ctx.body = user;
  }

  // create user
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.user.createUser();
    // ctx.body = 'create user';
  }

  // update user
  async update() {
    const { ctx } = this;
    ctx.body = 'update user';
  }

  // delete user
  async destroy() {
    const { ctx } = this;
    ctx.body = 'destroy user';
  }
}

module.exports = UserController;

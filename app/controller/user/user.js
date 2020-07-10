'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  // get users list
  async index() {
    const { ctx } = this;
    const users = await ctx.service.user.user.searchUsers([], [], 0, 10);
    ctx.body = users;
  }

  // user detail
  async show() {
    const { ctx } = this;
    const user = await ctx.service.user.user.getUser(3);
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

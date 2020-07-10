
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getUser(id) {
    return await this.ctx.model.User.User.findByPk(id);
    // return {
    //   username: '张三',
    //   password: '123456',
    // };
  }

  async createUser() {
    const user = await this.ctx.model.User.User.create({
      username: '张无忌',
      age: 15,
    });
    return user;
  }

  async searchUsers(conditions, orderBy, start, limit, columns = []) {
    return [
      {
        username: '张三',
        password: '123456',
      },
      {
        username: '李四',
        password: '123456',
      },
    ];
  }
}

module.exports = UserService;

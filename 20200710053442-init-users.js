'use strict';

module.exports = {
  // TODO 字段长度无法指定 枚举类型字段无法设置
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('user', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID',
      },
      username: {
        type: STRING(256),
        unique: true,
        allowNull: false,
        comment: '账号',
      },
      age: {
        type: INTEGER,
        allowNull: false,
        unsigned: true,
        comment: '年龄',
      },
      created_time: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '创建时间',
      },
      updated_time: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '更新时间',
      },
    });
  },

  // 在执行数据库降级时调用的函数，删除 user 表
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};

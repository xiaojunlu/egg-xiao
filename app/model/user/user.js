'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;
  
  const User = app.model.define(
    'user',
    {
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
      gender: {
        type: ENUM('male', 'female', 'secret'),
        allowNull: false,
        defaultValue: 'secret',
        comment: '性别',
      },
      created_at: {
        type: DATE,
        allowNull: false,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        comment: '更新时间',
      },
    },
    {
      tableName: 'user',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return User;
};

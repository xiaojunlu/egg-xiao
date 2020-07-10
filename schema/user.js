'use strict';

module.exports = sequelize => {
  const { STRING, INTEGER, DATE, ENUM } = sequelize;

  return {
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
  };
};

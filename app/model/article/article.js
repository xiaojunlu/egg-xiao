'use strict';

module.exports = app => {
  const { STRING, INTEGER, ENUM } = app.Sequelize;

  const Article = app.model.define(
    'article',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID',
      },
      title: {
        type: STRING(256),
        unique: true,
        allowNull: false,
        comment: '文章标题',
      },
      status: {
        type: ENUM('published', 'unpublished', 'trash'),
        allowNull: false,
        defaultValue: 'unpublished',
        comment: '状态',
      },
      created_time: {
        type: INTEGER,
        allowNull: false,
        comment: '创建时间',
      },
      updated_time: {
        type: INTEGER,
        allowNull: false,
        comment: '更新时间',
      },
    },
    {
      tableName: 'article',
      timestamps: false,
    }
  );

  return Article;
};

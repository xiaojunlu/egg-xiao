'use strict';

module.exports = app => {
  const userSchema = require('../../../schema/user.js')(app.Sequelize);

  const User = app.model.define('user', userSchema, {
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return User;
};

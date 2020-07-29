'use strict';

// sequelize plugin
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// validate plugin
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// redis plugin
exports.redis = {
  enable: false,
  package: 'egg-redis',
};
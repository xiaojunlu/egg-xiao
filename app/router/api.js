'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // user api
  router.resources('users', '/api/users', controller.user.user);

};

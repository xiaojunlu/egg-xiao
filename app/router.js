'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  // api router
  require('./router/api')(app);

  const { router, controller } = app;
  router.get('/', controller.home.index);
};

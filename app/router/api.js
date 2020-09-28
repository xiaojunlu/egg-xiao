'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // user
  router.resources('users', '/api/users', controller.user.user);

  // article router
  router.get('/api/articles', controller.article.article.search);
  router.post('/api/articles', controller.article.article.create);
  router.get('/api/articles/:id', controller.article.article.get);
  router.put('/api/articles/:id', controller.article.article.update);
  router.delete('/api/articles/:id', controller.article.article.remove);
};

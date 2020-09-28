'use strict';

const HttpException = require('../exception/http_exception.js');

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      console.log('enter exception handler!', err.httpCode, err.message);
      const status = err.status || 500;
      const error = {};
      if (err instanceof HttpException) {
        error.requestUrl = `${ctx.method} : ${ctx.path}`;
        error.message = err.message;
        error.code = err.code;
      } else {
        // 未知异常，系统异常，线上不显示堆栈信息
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        error.code = err.code;
        error.message =
          status === 500 && ctx.app.config.env === 'prod'
            ? 'Internal Server Error'
            : err.message;
      }

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      ctx.status = status;
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
    }
  };
};

'use strict';

const Controller = require('egg').Controller;

const DEFAULT_PAGING_OFFSET = 0; // 本次响应返回的结果集是从第几个资源起的序号

const DEFAULT_PAGING_LIMIT = 1; // 默认每页数量

const MAX_PAGING_LIMIT = 100; // 每页记录最多数量

const PREFIX_SORT_DESC = '-';

class BaseController extends Controller {

  /**
   * get paging offset and limit
   */
  async getOffsetAndLimit() {
    const offset = parseInt(this.ctx.query.offset) || DEFAULT_PAGING_OFFSET;
    const limit = parseInt(this.ctx.query.limit) || DEFAULT_PAGING_LIMIT;

    return {
      offset,
      limit: limit > MAX_PAGING_LIMIT ? MAX_PAGING_LIMIT : limit,
    };
  }

  /**
   * get sort
   */
  async getSort() {
    const sortStr = this.ctx.query.sort;
    if (sortStr) {
      const splitSort = sortStr.split(',');
      const sort = [];
      for (const [ key, part ] of splitSort.entries()) {
        const prefix = part.substr(0, 1);
        const field = part.replace(PREFIX_SORT_DESC, '');
        if (PREFIX_SORT_DESC === prefix) {
          sort[key] = [ field, 'DESC' ];
        } else {
          sort[key] = [ field, 'ASC' ];
        }
      }
      return sort;
    }

    return [];
  }

  /**
   * make paging object
   * @param {*} objects
   * @param {*} total
   * @param {*} offset
   * @param {*} limit
   */
  async makePagingObject(objects, total, offset, limit) {
    return {
      data: objects,
      paging: {
        total,
        offset,
        limit,
      },
    };
  }

  async filter(data, name) {
    const [ module, className ] = name.split('.');
    console.log(module, className);
    const classFilter = require(`./${module}/${className}.js`);
    const filter = new classFilter();
    filter.filter(data);
    console.log('----------', data);
    return data;
  }
}

module.exports = BaseController;

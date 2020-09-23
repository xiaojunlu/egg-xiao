'use strict';

const _ = require('lodash');
const moment = require('moment');

class Filter {
  constructor() {
    this.mode = this.publicMode();
  }

  setMode(mode) {
    this.mode = mode;
  }

  /**
   * 单条数据过滤
   * @param {*} data 数据
   */
  filter(data) {
    if (_.isEmpty(data)) {
      return {};
    }

    data = this.defaultTimeFilter(data);

    let filteredData = {};
    for (const mode of [
      this.simpleMode(),
      this.publicMode(),
      this.authenticatedMode(),
    ]) {
      const property = `${mode}Fields`;
      const propertyFilter = `${property}Filter`;
      if (this.hasOwnProperty(property)) {
        let partData = _.pick(data, this[property]);
        if (this.hasOwnProperty(propertyFilter)) {
          partData = this[propertyFilter](partData);
        }

        // console.log(partData);
        filteredData = _.assign(filteredData, partData);
        if (this.mode === property.replace('Fields', '')) {
          break;
        }
      }
    }

    if (!_.isEmpty(filteredData)) {
      data = filteredData;
    }

    return data;
  }

  /**
   * 多条数据过滤
   * @param {*} dataSet 数据
   */
  filters(dataSet) {
    if (_.isEmpty(dataSet)) {
      return {};
    }

    if (_.has(dataSet, 'data') && _.has(dataSet, 'paging')) {
      _(dataSet.data).forEach(data => {
        return this.filter(data);
      });
    } else {
      _(dataSet).forEach(data => {
        return this.filter(data);
      });
    }

    return dataSet;
  }

  /**
   * 自动格式化时间
   * @param {*} data 数据
   */
  defaultTimeFilter(data) {
    if (_.has(data, 'created_time') && _.isNumber(data.created_time)) {
      data.created_time = moment
        .unix(data.created_time)
        .format('YYYY-MM-DD HH:mm');
    }

    if (_.has(data, 'updated_time') && _.isNumber(data.updated_time)) {
      data.updated_time = moment
        .unix(data.updated_time)
        .format('YYYY-MM-DD HH:mm');
    }

    return data;
  }

  simpleMode() {
    return 'simple';
  }

  publicMode() {
    return 'public';
  }

  authenticatedMode() {
    return 'authenticated';
  }
}

module.exports = Filter;

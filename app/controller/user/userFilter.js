'use strict';

const _ = require('lodash');

class UserFilter {
  filter(data) {
    console.log('+++++++++++', data);
    _.unset(data, [ 'password', 'gender' ]);
    console.log('----------', data);
  }

  filters(dataSet) {
    if (dataSet.length <= 0) {
      return;
    }

    if (_.has(dataSet, 'data') && _.has(dataSet, 'paging')) {
      for (const data of dataSet.data) {
        this.filter(data);
      }
    } else {
      for (const data of dataSet.data) {
        this.filter(data);
      }
    }
  }
}

module.exports = UserFilter;

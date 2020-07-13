'use strict';

const Filter = require('../filter.js');

class UserFilter extends Filter {
  mode = 'simple';

  simpleFields = ['username', 'created_at'];

  async simpleFields(data) {
    console.log('this is simpleFields return!', data);
  }
}

module.exports = UserFilter;
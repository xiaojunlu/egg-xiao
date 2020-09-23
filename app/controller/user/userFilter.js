'use strict';

// const _ = require('lodash');
const Filter = require('../filter');

class UserFilter extends Filter {
  constructor() {
    super();
    this.mode = this.publicMode();
    this.simpleFields = [ 'id' ];
    this.publicFields = [ 'id', 'username', 'created_at', 'created_time' ];
    this.simpleFieldsFilter = this.simpleFieldsFilter.bind(this);
    this.publicFieldsFilter = this.publicFieldsFilter.bind(this);
  }

  simpleFieldsFilter(data) {
    data.demo = 123456789;
    console.log('welcome to simpleFields filter!');
    return data;
  }

  publicFieldsFilter(data) {
    data.username = 1111;
    console.log('welcome to publicFields filter!');
    return data;
  }
}

module.exports = UserFilter;

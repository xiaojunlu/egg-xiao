'use strict';

const Filter = require('../filter');

class ArticleFilter extends Filter {
  constructor() {
    super();
    this.publicFields = [ 'id', 'title', 'created_time', 'updated_time' ];
    this.publicFieldsFilter = this.publicFieldsFilter.bind(this);
  }

  publicFieldsFilter(data) {
    data.username = 1111;
    return data;
  }
}

module.exports = ArticleFilter;

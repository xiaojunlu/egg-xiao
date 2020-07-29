'use strict';

module.exports = {
  //字符串转整形
  toInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },
};

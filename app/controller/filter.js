'use strict';

const SIMPLE_MODE = 'simple'; // 简化模式,只返回少量的非隐私字段

const PUBLIC_MODE = 'public'; // 公开模式,返回未登录用户可访问的字段

const AUTHENTICATED_MODE = 'authenticated'; // 认证模式,返回用户登录后可访问的字段

// TODO
class Filter {
  mode = PUBLIC_MODE;

  async setMode(mode) {
    this.mode = mode;
  }

  async filter(data) {
    if (Object.keys(data).length === 0) {
      return null;
    }

    // console.log('-=-=-=-=', this.__proto__.hasOwnProperty('simpleFields'));
    // const a = ['username', 'password'];
    // const b = ['username'];
    // console.log(a.filter((item) => b.indexOf(item) != -1));

    const filteredData = [];
    for (const mode of [SIMPLE_MODE, PUBLIC_MODE, AUTHENTICATED_MODE]) {
      const property = `${mode}Fields`;
      console.log(property);
      if (this.hasOwnProperty(property)) {
        console.log(90090000, property, this[property],data);
        console.log('++++++++',Object.keys(data));
        const partData = Object.keys(data).filter(
          (item) => this[property].indexOf(item) > -1
        );

        //数据交集
        console.log('-------',partData);
        // const partData = data.filter(
        //   (item) => this[property].indexOf(item) > -1
        // );
        if (this.__proto__.hasOwnProperty(property)) {
          console.log(7777777);
          this.property(partData);
        }

        // filteredData += partData;
        // if (this.mode == property.replace('Fields', '')) {
        //   break;
        // }
      }
    }

    data.username = 'sssssss';
    console.log('+++++++++', this.mode, data);
  }
}

module.exports = Filter;

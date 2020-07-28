'use strict';

// TODO
class Filter {
  mode = 'public';

  filter(data) {
    this.simpleFieldsFilter();

    if (Object.keys(data).length === 0) {
      return null;
    }

    let filteredData = {};
    for (let mode of ['simple', 'public', 'authenticated']) {
      let property = `${mode}Fields`;
      console.log(property);
      if (this.hasOwnProperty(property)) {
        console.log('++++++++', property, this[property], data);
        console.log('--------', Object.keys(data));

        // 数据交集
        // const partData = Object.keys(data).filter(
        //   (item) => this[property].indexOf(item) > -1
        // );

        let partData = { username: 'asssss' };

        // for (var item of partData) {
        //   if (!data.hasOwnProperty(item)) {
        //       console.log(item);
        //   }
        // }

        let method = `${property}Filter`;
        console.log('-------', partData, method);
        if (this.__proto__.hasOwnProperty(method)) {
          this[method](data);
          //this.property(partData);
        }

        //filteredData += partData;
        Object.assign(filteredData, partData);
        if (this.mode == property.replace('Fields', '')) {
          break;
        }
      }
    }

    if (filteredData) {
      data = filteredData;
    }

    console.log('-=-=-=-=-=', filteredData, data);
  }
}

module.exports = Filter;

'use strict';

const _ = require('lodash');

class ObjectCombinationUtil {
  constructor() {
    this.serviceMap = {
      user: 'user.UserService',
    };
    this.methodMap = {
      user: 'findUsersByIds',
    };
  }

  single(sourceObj, targetIdFields = [], targetObjectType = 'user') {
    if (!sourceObj) {
      return;
    }

    const targetIds = this.findTargetIds(sourceObj, targetIdFields);

    const targetObjects = this.findTargetObjects(targetObjectType, targetIds);
    this.replaceSourceObject(targetObjects, sourceObj, targetIdFields);
  }

  findTargetIds(sourceObj, targetIdFields) {
    let targetIds = [];
    for (const targetIdField of targetIdFields) {
      const targetIdValue = sourceObj[targetIdField];
      targetIds = this.pushIdToArray(targetIds, targetIdValue);
    }

    return targetIds;
  }

  pushIdToArray(sourceArr, idValue) {
    if (_.isArray(idValue)) {
      for (const idV of idValue) {
        sourceArr.push(idV);
      }
    } else {
      sourceArr.push(idValue);
    }

    return sourceArr;
  }

  findTargetObjects(targetObjectType, targetIds) {
    targetIds = _.uniq(targetIds);
    const service = this.serviceMap[targetObjectType];
    const method = this.methodMap[targetObjectType];
  }

  replaceSourceObject(targetObjects, sourceObj, targetIdFields) {
    for (const targetIdField of targetIdFields) {
      const newField = targetIdField.replace('_id', '');
      const targetIdValue = sourceObj[targetIdField];
      sourceObj[newField] = [];
      if (_.isArray(targetIdValue)) {
        for (const targetId of targetIdValue) {
          if (_.has(targetObjects[targetId])) {
            sourceObj[newField].push(targetObjects[targetId]);
          }
        }
      } else {
        if (_.has(targetObjects[targetIdValue])) {
          sourceObj[newField] = targetObjects[targetIdValue];
        } else {
          sourceObj[newField] = null;
        }
      }

      if (targetIdField !== newField) {
        _.unset(sourceObj, sourceObj[targetIdField]);
      }
    }

    // return sourceObj;
  }
}

module.exports = ObjectCombinationUtil;

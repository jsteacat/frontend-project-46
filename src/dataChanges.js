import { isEqual, isPlainObject } from 'lodash';

const diff = (obj1, obj2, depth = 1) => {
  // 1: get objects keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 2: get all unique keys
  // eslint-disable-next-line
  const allKeys = Array.from(new Set([...keys1, ...keys2])).sort();

  return allKeys.map((key) => {
    if (!keys1.includes(key) && keys2.includes(key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (keys1.includes(key) && !keys2.includes(key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (!isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        value: obj2[key],
      };
    }
    if (isPlainObject(obj1[key]) && isPlainObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        value: diff(obj1[key], obj2[key], depth + 1),
        depth,
      }
    }
    return {
      key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
};

export default diff;

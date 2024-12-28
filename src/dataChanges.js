import { isPlainObject, orderBy, isEqual } from 'lodash';

const diffTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...new Set([...keys1, ...keys2])];
  const sortedKeys = orderBy(keys);

  return sortedKeys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return { key, state: 'removed', value: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, state: 'added', value: obj2[key] };
    }
    if (isPlainObject(obj1[key]) && isPlainObject(obj2[key])) {
      return { key, state: 'nested', value: diffTree(obj1[key], obj2[key]) };
    }
    if (!isEqual(obj1[key], obj2[key])) {
      return {
        key, state: 'updated', oldValue: obj1[key], newValue: obj2[key],
      };
    }
    return { key, state: 'unchanged', value: obj1[key] };
  });
};

export default diffTree;

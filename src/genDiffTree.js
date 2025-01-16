import isObject from './utilits.js';

const genDiffTree = (obj1, obj2) => {
  // eslint-disable-next-line fp/no-mutating-methods
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();

  const genNormalizeValue = (value) => {
    if (isObject(value)) {
      return genDiffTree(value, value);
    }

    return value;
  };

  return keys.map((key) => {
    const value1 = genNormalizeValue(obj1[key]);
    const value2 = genNormalizeValue(obj2[key]);
    if (!Object.hasOwn(obj1, key)) {
      return { status: 'added', key, value: value2 };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { status: 'removed', key, value: value1 };
    }

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { status: 'nested', key, value: genDiffTree(obj1[key], obj2[key]) };
    }

    if (obj1[key] === obj2[key]) {
      return { status: 'unchanged', key, value: value1 };
    }

    return { status: 'modified', key, value: [value1, value2] };
  });

  return diff;
};

export default genDiffTree;

export default (obj1, obj2) => {
  // 1: get objects keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 2: get all unique keys
  // eslint-disable-next-line fp/no-mutating-methods
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
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        value: obj2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
};

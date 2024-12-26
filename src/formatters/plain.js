export default (tree) => tree.reduce((acc, prop) => {
  switch (prop.type) {
    case 'added':
      return [...acc, `Property '${prop.key}' was added with value: ${prop.value}`];
    case 'deleted':
      return [...acc, `Property '${prop.key}' was removed`];
    case 'changed':
      return [...acc, `Property '${prop.key}' was updated. From ${prop.oldValue} to ${prop.value}`];
    case 'unchanged':
      return acc;
    default:
      throw new Error(`Unknown type: ${prop.type}`);
  }
}, []).join('\n');

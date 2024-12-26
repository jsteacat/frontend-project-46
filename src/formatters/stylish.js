import isObject from '../utils/isObject.js';

const setTab = (depth) => '  '.repeat((depth * 2) - 2);
const renderObject = (obj, depth) => {
  if (!isObject(obj)) return obj;
  const objectToString = Object.entries(obj).map(([key, value]) => `${setTab(depth + 1)}${key}: ${renderObject(value, depth + 1)}`);
  return `{\n${objectToString.join('\n')}\n${setTab(depth)}}`;
};

const renderType = {
  added: (node, depth) => `${setTab(depth)}  + ${node.key}: ${renderObject(node.value, depth + 1)}`,
  deleted: (node, depth) => `${setTab(depth)}  - ${node.key}: ${renderObject(node.value, depth + 1)}`,
  changed: (node, depth) => [
    `${setTab(depth)}  - ${node.key}: ${renderObject(node.oldValue, depth)}`,
    `${setTab(depth)}  + ${node.key}: ${renderObject(node.value, depth)}`,
  ],
  unchanged: (node, depth) => `${setTab(depth)}    ${node.key}: ${renderObject(node.value, depth + 1)}`,
};

export default (tree) => {
  const iter = (node, depth) => {
    const dataToString = node.flatMap((elem) => renderType[elem.type](elem, depth, iter));
    return `{\n${dataToString.join('\n')}\n${setTab(depth)}}`;
  };
  return iter(tree, 1);
};

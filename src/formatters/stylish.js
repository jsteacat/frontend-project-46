import _ from 'lodash';

const fourSpaces = '    ';
const getCurrentIndent = (depth) => `${fourSpaces.repeat(depth - 1)}${fourSpaces.slice(0, 2)}`;
const getBracketIndent = (depth) => fourSpaces.repeat(depth - 1);

const stringify = (value, depth = 1) => {
  if (!(_.isObject(value))) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.flatMap((key) => `${getCurrentIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n${getBracketIndent(depth + 1)}}`;
};

const genStylishFormat = (tree, depth = 1) => {
  const result = tree.flatMap((node) => {
    switch (node.status) {
      case 'added':
        return `${getCurrentIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${getCurrentIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'modified':
        return `${getCurrentIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}\n`
          + `${getCurrentIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      case 'unchanged':
        return `${getCurrentIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
      case 'nested':
        return `${getCurrentIndent(depth)}  ${node.key}: ${genStylishFormat(node.value, depth + 1)}`;
      default:
        return 'Error';
    }
  });
  return `{\n${result.join('\n')}\n${getBracketIndent(depth)}}`;
};

export default genStylishFormat;

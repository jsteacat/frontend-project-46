import jsonFormatter from './json.js';
import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

const formatter = {
  json: jsonFormatter,
  plain: plainFormatter,
  stylish: stylishFormatter,
};

export default (tree, format = 'stylish') => {
  if (!formatter[format]) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formatter[format](tree);
};

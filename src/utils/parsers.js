import YAML from 'yaml';

const objParsers = {
  json: JSON.parse,
  yml: YAML.parse,
  yaml: YAML.parse,
};

export default (data, format) => {
  if (!objParsers[format]) {
    throw new Error(`Unknown format: ${format}`);
  }
  return objParsers[format](data);
};

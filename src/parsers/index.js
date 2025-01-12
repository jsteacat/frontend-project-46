import { getFormat } from '../utils/path.js';
import readFile from '../utils/readFile.js';
import jsonParser from './json.js';
import yamlParser from './yaml.js';

const parser = {
  json: jsonParser,
  yaml: yamlParser,
  yml: yamlParser,
};

export default (filePath) => {
  const format = getFormat(filePath);
  const data = readFile(filePath);
  if (!parser[format]) {
    throw new Error(`Invalid format - ${format}`);
  }
  return parser[format](data);
};

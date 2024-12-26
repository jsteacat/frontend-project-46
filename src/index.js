import fs from 'fs';
import { getFormat, getFullPath } from './utils/path.js';
import parser from './utils/parsers.js';
import getDataChanges from './dataChanges.js';
import getFormattedData from './formatters/index.js';

export default (filepath1, filepath2, format) => {
  // 1: get full paths
  const fullPathFile1 = getFullPath(filepath1);
  const fullPathFile2 = getFullPath(filepath2);

  // 2: read files
  const file1 = fs.readFileSync(fullPathFile1, 'utf-8');
  const file2 = fs.readFileSync(fullPathFile2, 'utf-8');

  // 3: parse files
  const parsedFile1 = parser(file1, getFormat(fullPathFile1));
  const parsedFile2 = parser(file2, getFormat(fullPathFile2));

  // 4: get data changes
  const dataChanges = getDataChanges(parsedFile1, parsedFile2);

  // 5: get formatted data
  return getFormattedData(dataChanges, format);
};

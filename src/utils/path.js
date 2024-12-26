import path from 'path';

export const getFullPath = (filepath) => {
  const isAbsolute = filepath.startsWith('/');
  if (isAbsolute) {
    return filepath;
  }
  return path.resolve(process.cwd(), filepath);
};

export const getFormat = (filepath) => {
  const ext = path.extname(filepath);
  return ext.slice(1);
};

export default { getFullPath, getFormat };

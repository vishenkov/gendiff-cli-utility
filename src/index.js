import fs from 'fs';
import path from 'path';
import gendiff from './gendiff';
import getParser from './parsers';

const getObj = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const { ext } = path.parse(filepath);
  const parse = getParser(ext);
  return parse(data);
};

export default (filepath1, filepath2) =>
  gendiff(getObj(filepath1), getObj(filepath2));

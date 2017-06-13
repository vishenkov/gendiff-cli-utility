import fs from 'fs';
import path from 'path';
import gendiff from './gendiff';
import parse from './parsers';

const getObj = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const { ext } = path.parse(filepath);
  const parseData = parse(ext);
  return parseData(data);
};

export default (filepath1, filepath2) =>
  gendiff(getObj(filepath1), getObj(filepath2));

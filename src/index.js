import fs from 'fs';
import path from 'path';
import gendiff from './gendiff';
import getParser from './parsers';
import astRender from './renders';

const getObj = (filepath) => {
  const { ext } = path.parse(filepath);
  const parse = getParser(ext);
  const data = fs.readFileSync(filepath, 'utf8');
  return parse(data);
};

export default (filepath1, filepath2, render = astRender) =>
  render(gendiff(getObj(filepath1), getObj(filepath2)));

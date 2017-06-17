import fs from 'fs';
import path from 'path';
import gendiff from './gendiff';
import getParser from './parsers';
import getRender from './renders';

const getObj = (filepath) => {
  const { ext } = path.parse(filepath);
  const parse = getParser(ext);
  const data = fs.readFileSync(filepath, 'utf8');
  return parse(data);
};

export default (filepath1, filepath2, opt = 'indent') => {
  const obj1 = getObj(filepath1);
  const obj2 = getObj(filepath2);
  const diff = gendiff(obj1, obj2);
  const render = getRender(opt);
  console.log(JSON.stringify(diff, null, '  '));
  return render(diff);
};

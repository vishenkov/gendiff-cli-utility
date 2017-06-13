import fs from 'fs';
import path from 'path';
import gendiff from './gendiff';
import parser from './parsers';

const adapter = (parser1, parser2, generator) =>
  (data1, data2) =>
    generator(parser1(data1), parser2(data2));

const getExt = (filepath) => {
  const { ext } = path.parse(filepath);
  return ext;
};

export default (path1, path2) => {
  const ext1 = getExt(path1);
  const ext2 = getExt(path2);
  const data1 = fs.readFileSync(path1, 'utf8');
  const data2 = fs.readFileSync(path2, 'utf8');

  return adapter(parser(ext1), parser(ext2), gendiff)(data1, data2);
};

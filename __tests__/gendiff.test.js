import gendiff from '../src';

const basePath = '__tests__/__fixtures__/';
const genTest = (type) => {
  test(`${type}: before1 && after1 diff`, () => {
    expect(gendiff(`${basePath}before1.${type}`, `${basePath}after1.${type}`))
    .toBe('{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}');
  });

  test(`${type}: empty && after1 diff`, () => {
    expect(gendiff(`${basePath}empty.${type}`, `${basePath}after1.${type}`))
    .toBe('{\n\t+ timeout: 20\n\t+ verbose: true\n\t+ host: hexlet.io\n}');
  });

  test(`${type}: before1 && empty diff`, () => {
    expect(gendiff(`${basePath}before1.${type}`, `${basePath}empty.${type}`))
    .toBe('{\n\t- host: hexlet.io\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n}');
  });

  test(`${type}: empty && empty diff`, () => {
    expect(gendiff(`${basePath}empty.${type}`, `${basePath}empty.${type}`))
    .toBe('{\n}');
  });

  test(`${type}: before1 && before1 diff`, () => {
    expect(gendiff(`${basePath}before1.${type}`, `${basePath}before1.${type}`))
    .toBe('{\n\t  host: hexlet.io\n\t  timeout: 50\n\t  proxy: 123.234.53.22\n}');
  });
};
const genNestedTest = (type) => {
  test(`${type}: before2 && before2 diff`, () => {
    expect(gendiff(`${basePath}before2.${type}`, `${basePath}after2.${type}`))
    .toBe('{\n\t  common: {\n\t\t  setting1: Value 1\n\t\t- setting2: 200\n\t\t  setting3: true\n\t\t- setting6: {\n\t\t\t  key: value\n\t\t}\n\t\t+ setting4: blah blah\n\t\t+ setting5: {\n\t\t\t  key5: value5\n\t\t}\n\t}\n\t  group1: {\n\t\t+ baz: bars\n\t\t- baz: bas\n\t\t  foo: bar\n\t}\n\t- group2: {\n\t\t  abc: 12345\n\t}\n\t+ group3: {\n\t\t  fee: 100500\n\t}\n}');
  });
  test(`${type}: before3 && before3 diff`, () => {
    expect(gendiff(`${basePath}before3.${type}`, `${basePath}after3.${type}`))
    .toBe('{\n\t  common: {\n\t\t  setting1: Value 1\n\t\t- setting2: 200\n\t\t  setting3: true\n\t\t+ setting6: not nested\n\t\t- setting6: {\n\t\t\t  key: value\n\t\t}\n\t\t+ setting4: blah blah\n\t\t+ setting5: {\n\t\t\t  key5: value5\n\t\t}\n\t}\n\t  group1: {\n\t\t+ baz: bars\n\t\t- baz: bas\n\t\t  foo: bar\n\t}\n\t- group2: {\n\t\t  abc: 12345\n\t}\n\t  group4: {\n\t\t+ key1: {\n\t\t\t  type: string\n\t\t\t  content: value\n\t\t}\n\t\t- key1: value1\n\t\t  key2: {\n\t\t\t  nested1: {\n\t\t\t\t  key0: value0\n\t\t\t\t  key1: value1\n\t\t\t\t+ key2: value2\n\t\t\t}\n\t\t}\n\t\t+ key3: https://\n\t\t- key3: {\n\t\t\t  url: https://\n\t\t}\n\t}\n\t+ group3: {\n\t\t  fee: 100500\n\t}\n}');
  });

  test(`${type}: before3 && empty diff`, () => {
    expect(gendiff(`${basePath}before3.${type}`, `${basePath}empty.${type}`))
    .toBe('{\n\t- common: {\n\t\t  setting1: Value 1\n\t\t  setting2: 200\n\t\t  setting3: true\n\t\t  setting6: {\n\t\t\t  key: value\n\t\t}\n\t}\n\t- group1: {\n\t\t  baz: bas\n\t\t  foo: bar\n\t}\n\t- group2: {\n\t\t  abc: 12345\n\t}\n\t- group4: {\n\t\t  key1: value1\n\t\t  key2: {\n\t\t\t  nested1: {\n\t\t\t\t  key0: value0\n\t\t\t\t  key1: value1\n\t\t\t}\n\t\t}\n\t\t  key3: {\n\t\t\t  url: https://\n\t\t}\n\t}\n}');
  });

  test(`${type}: before4 && before4 diff`, () => {
    expect(gendiff(`${basePath}before4.${type}`, `${basePath}after4.${type}`))
    .toBe('{\n\t  lvl1: {\n\t\t  lvl2: {\n\t\t\t  lvl3: {\n\t\t\t\t  lvl4: {\n\t\t\t\t\t  lvl5: {\n\t\t\t\t\t\t  lvl6: {\n\t\t\t\t\t\t\t  key: value\n\t\t\t\t\t\t\t+ foo: bar\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}');
  });
};

genTest('json');
genTest('yml');
genTest('ini');

genNestedTest('json');
genNestedTest('yml');
genNestedTest('ini');

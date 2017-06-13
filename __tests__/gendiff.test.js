import gendiff from '../src';

const basePath = '__tests__/__fixtures__/';
const genTest = (type) => {
  test(`${type}: before1 && after1 diff`, () => {
    expect(gendiff(`${basePath}before1.${type}`, `${basePath}after1.${type}`))
    .toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}`);
  });

  test(`${type}: empty && after1 diff`, () => {
    expect(gendiff(`${basePath}empty.${type}`, `${basePath}after1.${type}`))
    .toBe(`{\n\t+ timeout: 20\n\t+ verbose: true\n\t+ host: hexlet.io\n}`);
  });

  test(`${type}: before1 && empty diff`, () => {
    expect(gendiff(`${basePath}before1.${type}`, `${basePath}empty.${type}`))
    .toBe(`{\n\t- host: hexlet.io\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n}`);
  });

  test(`${type}: empty && empty diff`, () => {
    expect(gendiff(`${basePath}empty.${type}`, `${basePath}empty.${type}`))
    .toBe(`{\n}`);
  });

  test(`${type}: before1 && before1 diff`, () => {
    expect(gendiff(`${basePath}before1.${type}`, `${basePath}before1.${type}`))
    .toBe(`{\n\t  host: hexlet.io\n\t  timeout: 50\n\t  proxy: 123.234.53.22\n}`);
  });
};

genTest('json');
genTest('yml');
genTest('ini');

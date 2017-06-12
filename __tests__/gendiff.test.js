import gendiff from '../src';

test('jsons: before1 && after1 diff', () => {
  expect(gendiff('__tests__/__fixtures__/before1.json', '__tests__/__fixtures__/after1.json'))
  .toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}`);
});

test('jsons: empty && after1 diff', () => {
  expect(gendiff('__tests__/__fixtures__/empty.json', '__tests__/__fixtures__/after1.json'))
  .toBe(`{\n\t+ timeout: 20\n\t+ verbose: true\n\t+ host: hexlet.io\n}`);
});

test('jsons: before1 && empty diff', () => {
  expect(gendiff('__tests__/__fixtures__/before1.json', '__tests__/__fixtures__/empty.json'))
  .toBe(`{\n\t- host: hexlet.io\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n}`);
});

test('jsons: empty && empty diff', () => {
  expect(gendiff('__tests__/__fixtures__/empty.json', '__tests__/__fixtures__/empty.json'))
  .toBe(`{\n}`);
});

test('jsons: before1 && before1 diff', () => {
  expect(gendiff('__tests__/__fixtures__/before1.json', '__tests__/__fixtures__/before1.json'))
  .toBe(`{\n\t  host: hexlet.io\n\t  timeout: 50\n\t  proxy: 123.234.53.22\n}`);
});

test('yaml: before1 && after1 diff', () => {
  expect(gendiff('__tests__/__fixtures__/before1.yml', '__tests__/__fixtures__/after1.yml'))
  .toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}`);
});

test('yaml: empty && after1 diff', () => {
  expect(gendiff('__tests__/__fixtures__/empty.yml', '__tests__/__fixtures__/after1.yml'))
  .toBe(`{\n\t+ timeout: 20\n\t+ verbose: true\n\t+ host: hexlet.io\n}`);
});

test('yaml: before1 && empty diff', () => {
  expect(gendiff('__tests__/__fixtures__/before1.yml', '__tests__/__fixtures__/empty.yml'))
  .toBe(`{\n\t- host: hexlet.io\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n}`);
});

test('yaml: empty && empty diff', () => {
  expect(gendiff('__tests__/__fixtures__/empty.yml', '__tests__/__fixtures__/empty.yml'))
  .toBe(`{\n}`);
});

test('yaml: before1 && before1 diff', () => {
  expect(gendiff('__tests__/__fixtures__/before1.yml', '__tests__/__fixtures__/before1.yml'))
  .toBe(`{\n\t  host: hexlet.io\n\t  timeout: 50\n\t  proxy: 123.234.53.22\n}`);
});

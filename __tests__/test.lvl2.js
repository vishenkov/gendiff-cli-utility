
import gendiff from '../dist';

test('module exists', () => {
  expect(typeof gendiff).toBe('function');
});

test('jsons: before1 && after1 diff', () => {
  expect(gendiff('__tests__/files/before1.json', '__tests__/files/after1.json'))
  .toBe(`{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t+ verbose: true\n}`);
});

test('jsons: empty && after1 diff', () => {
  expect(gendiff('__tests__/files/empty.json', '__tests__/files/after1.json'))
  .toBe(`{\n\t+ timeout: 20\n\t+ verbose: true\n\t+ host: hexlet.io\n}`);
});

test('jsons: before1 && empty diff', () => {
  expect(gendiff('__tests__/files/before1.json', '__tests__/files/empty.json'))
  .toBe(`{\n\t- host: hexlet.io\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n}`);
});

test('jsons: empty && empty diff', () => {
  expect(gendiff('__tests__/files/empty.json', '__tests__/files/empty.json'))
  .toBe(`{\n}`);
});

test('jsons: before1 && before1 diff', () => {
  expect(gendiff('__tests__/files/before1.json', '__tests__/files/before1.json'))
  .toBe(`{\n\t  host: hexlet.io\n\t  timeout: 50\n\t  proxy: 123.234.53.22\n}`);
});
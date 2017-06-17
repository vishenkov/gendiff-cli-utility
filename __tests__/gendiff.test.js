import fs from 'fs';
import gendiff from '../src';
import { plainRender } from '../src/renders';

const basePath = '__tests__/__fixtures__/';
const genTest = (type) => {
  test(`${type}: before1 && after1 diff`, () => {
    const diff1 = fs.readFileSync(`${basePath}diff1`, 'utf8');
    expect(gendiff(`${basePath}before1.${type}`, `${basePath}after1.${type}`))
    .toBe(diff1);
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
  const diff2 = fs.readFileSync(`${basePath}diff2`, 'utf8');
  test(`${type}: before2 && after2 diff`, () => {
    expect(gendiff(`${basePath}before2.${type}`, `${basePath}after2.${type}`))
    .toBe(diff2);
  });

  const diff3 = fs.readFileSync(`${basePath}diff3`, 'utf8');
  test(`${type}: before3 && after3 diff`, () => {
    expect(gendiff(`${basePath}before3.${type}`, `${basePath}after3.${type}`))
    .toBe(diff3);
  });

  const diffBefore3AndEmpty = fs.readFileSync(`${basePath}diff_before3_and_empty`, 'utf8');
  test(`${type}: before3 && empty diff`, () => {
    expect(gendiff(`${basePath}before3.${type}`, `${basePath}empty.${type}`))
    .toBe(diffBefore3AndEmpty);
  });

  const diff4 = fs.readFileSync(`${basePath}diff4`, 'utf8');
  test(`${type}: before4 && after4 diff`, () => {
    expect(gendiff(`${basePath}before4.${type}`, `${basePath}after4.${type}`))
    .toBe(diff4);
  });
};

const genPlainTest = (type) => {
  const diff1Plain = fs.readFileSync(`${basePath}diff1(plain)`, 'utf8');
  test(`${type}::plain:: before1 && after1 diff`, () => {
    expect(gendiff(`${basePath}before1.${type}`, `${basePath}after1.${type}`, plainRender))
    .toBe(diff1Plain);
  });

  const diff2Plain = fs.readFileSync(`${basePath}diff2(plain)`, 'utf8');
  test(`${type}::plain:: before2 && after2 diff`, () => {
    expect(gendiff(`${basePath}before2.${type}`, `${basePath}after2.${type}`, plainRender))
    .toBe(diff2Plain);
  });

  const diff3Plain = fs.readFileSync(`${basePath}diff3(plain)`, 'utf8');
  test(`${type}::plain:: before3 && after3 diff`, () => {
    expect(gendiff(`${basePath}before3.${type}`, `${basePath}after3.${type}`, plainRender))
    .toBe(diff3Plain);
  });

  test(`${type}::plain:: before3 && after3 diff`, () => {
    expect(gendiff(`${basePath}before3.${type}`, `${basePath}before3.${type}`, plainRender))
    .toBe('');
  });
};

// genTest('json');
// genTest('yml');
// genTest('ini');

// genNestedTest('json');
// genNestedTest('yml');
// genNestedTest('ini');

genPlainTest('json');
genPlainTest('yml');
genPlainTest('ini');

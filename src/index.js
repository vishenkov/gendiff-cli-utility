import fs from 'fs';

export default (path1, path2) => {
  const data1 = JSON.parse(fs.readFileSync(path1));
  const data2 = JSON.parse(fs.readFileSync(path2));

  const parsedData1 = Object.keys(data1).reduce((acc, key) => {
    if (data2[key]) {
      if (data2[key] === data1[key]) {
        return `${acc}\n\t  ${key}: ${data1[key]}`;
      }
      return `${acc}\n\t+ ${key}: ${data2[key]}\n\t- ${key}: ${data1[key]}`;
    }
    return `${acc}\n\t- ${key}: ${data1[key]}`;
  }, '{');

  const result = Object.keys(data2).reduce((acc, key) => {
    if (!data1[key]) {
      return `${acc}\n\t+ ${key}: ${data2[key]}`;
    }
    return acc;
  }, parsedData1);

  return `${result}\n}`;
};

import _ from 'lodash';

const format = (data, key, sign) => `\n\t${sign} ${key}: ${data[key]}`;

const compare = (data1, data2, key) => {
  if ((key in data1) && (key in data2)) {
    if (data1[key] === data2[key]) {
      return format(data1, key, ' ');
    }
    return `${format(data2, key, '+')}${format(data1, key, '-')}`;
  }
  if (data1[key]) {
    return format(data1, key, '-');
  }
  return format(data2, key, '+');
};

export default (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.reduce((acc, key) => `${acc}${compare(data1, data2, key)}`, '');
  return `{${result}\n}`;
};

import _ from 'lodash';

const genDiff = (data1, data2) => {
  const genObject = data =>
    Object.keys(data)
    .map((key) => {
      if (data[key] instanceof Object) {
        return { type: 'original', key, children: genObject(data[key]) };
      }
      return { type: 'original', key, value: data[key] };
    });

  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    if ((data1[key] instanceof Object) && (data2[key] instanceof Object)) {
      return { type: 'nested', key, children: genDiff(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return { type: 'original', key, value: data1[key] };
    }
    if ((key in data1) && (key in data2)) {
      const oldValue = data1[key] instanceof Object ? genObject(data1[key]) : data1[key];
      const newValue = data2[key] instanceof Object ? genObject(data2[key]) : data2[key];
      return { type: 'changed', key, old: oldValue, new: newValue };
    }
    if (key in data2) {
      if (data2[key] instanceof Object) {
        return { type: 'new', key, children: genObject(data2[key]) };
      }
      return { type: 'new', key, value: data2[key] };
    }
    if (data1[key] instanceof Object) {
      return { type: 'deleted', key, children: genObject(data1[key]) };
    }
    return { type: 'deleted', key, value: data1[key] };
  });
};

export default genDiff;

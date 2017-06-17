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
      return { type: 'changed', key, old: data1[key], new: data2[key] };
    }
    if (key in data2) {
      return { type: 'new', key, value: data2[key] };
    }
    return { type: 'deleted', key, value: data1[key] };
  });
};

export default genDiff;

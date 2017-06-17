export default (ast) => {
  const inner = astObj =>
    astObj.reduce((acc, obj) => {
      const key = obj.key ? obj.key : '';
      if (obj.type === 'nested') {
        const value = inner(obj.children);
        return { ...acc, [key]: [value] };
      }
      if (obj.type === 'changed') {
        return { ...acc, [key]: { type: obj.type, old: obj.old, new: obj.new } };
      }
      return { ...acc, [key]: { type: obj.type, value: obj.value } };
    }, {});

  const astStr = inner(ast);
  return JSON.stringify(astStr, (key, value) => {
    if (!(value instanceof Object)) {
      return String(value);
    }
    return value;
  }, '  ');
};

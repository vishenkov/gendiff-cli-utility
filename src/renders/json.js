export default (ast) => {
  const getIndent = (depthNum, indent) => {
    if (depthNum <= 0) {
      return '';
    }
    return `${indent}${getIndent(depthNum - 1, indent)}`;
  };
  const inner = astObj =>
    astObj.reduce((acc, obj) => {
      const key = obj.key ? obj.key : '';

      if (obj.type === 'nested') {
        const value = inner(obj.children);
        return { ...acc, [key]: [value] };
      }
      if (obj.type === 'changed') {
        const oldValue = obj.old instanceof Object ? inner(obj.old) : String(obj.old);
        const newValue = obj.new instanceof Object ? inner(obj.new) : String(obj.new);
        return { ...acc, [key]: { type: obj.type, oldValue, newValue } };
      }
      const value = obj.children instanceof Object ? inner(obj.children) : String(obj.value);
      return { ...acc, [key]: { type: obj.type, value } };
    }, {});

  const astStr = inner(ast);
  return JSON.stringify(astStr, null, '  ');
};

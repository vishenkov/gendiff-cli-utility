export default (ast) => {
  const getIndent = (depthNum, indent) => {
    if (depthNum <= 0) {
      return '';
    }
    return `${indent}${getIndent(depthNum - 1, indent)}`;
  };

  const getTypeStr = (type) => {
    switch (type) {
      case 'deleted':
        return '-';
      case 'new':
        return '+';
      case 'original':
        return ' ';
      case 'nested':
        return ' ';
      default:
        return '';
    }
  };

  const getValue = (value, depth = 0, indent = '\t') => {
    const ind = getIndent(depth, indent);
    if (value instanceof Object) {
      const result = Object.keys(value)
        .map((key) => {
          const val = value[key] instanceof Object ?
              getValue(value[key], depth + 1, indent)
            : value[key];
          return `  ${key}: ${val}`;
        }).join(`\n${ind}`);
      return `{\n${ind}${result}\n${getIndent(depth - 1, indent)}}`;
    }
    return value;
  };

  const inner = (astObj, depth = 0, indent = '\t') =>
    astObj.map((obj) => {
      const key = obj.key ? `${obj.key}: ` : '';
      const ind = getIndent(depth, indent);
      const type = getTypeStr(obj.type);

      if (obj.type === 'nested') {
        const value = inner(obj.children, depth + 1, indent);
        return `\n${ind}${type} ${key}{${value}\n${ind}}`;
      }
      if (obj.type === 'changed') {
        const oldValue = getValue(obj.old, depth + 1, indent);
        const newValue = getValue(obj.new, depth + 1, indent);
        return `\n${ind}+ ${key}${newValue}\n${ind}- ${key}${oldValue}`;
      }
      const value = getValue(obj.value, depth + 1, indent);
      return `\n${ind}${type} ${key}${value}`;
    }).join('');

  const astStr = inner(ast, 1, '\t');
  return `{${astStr}\n}`;
};

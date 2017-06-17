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
        const oldValue = obj.old instanceof Object ? `{${inner(obj.old, depth + 1, indent)}\n${ind}}` : obj.old;
        const newValue = obj.new instanceof Object ? `{${inner(obj.new, depth + 1, indent)}\n${ind}}` : obj.new;
        return `\n${ind}+ ${key}${newValue}\n${ind}- ${key}${oldValue}`;
      }
      const value = obj.children instanceof Object ? `{${inner(obj.children, depth + 1, indent)}\n${ind}}` : obj.value;
      return `\n${ind}${type} ${key}${value}`;
    }).join('');

  const astStr = inner(ast, 1, '\t');
  return `{${astStr}\n}`;
};

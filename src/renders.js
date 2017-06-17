export const indentRender = (ast) => {
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

export const plainRender = (ast) => {
  const inner = astObj =>
    astObj.reduce((acc, obj) => {
      if (obj.type === 'nested') {
        const children = inner(obj.children).split('\n')
          .reduce((accum, value) => (value ? `${accum}${obj.key}.${value}\n` : accum), '');
        return `${acc}${children}`;
      }
      if (obj.type === 'changed') {
        const oldValue = obj.old instanceof Object ? 'complex value' : `'${obj.old}'`;
        const newValue = obj.new instanceof Object ? 'complex value' : `'${obj.new}'`;
        return `${acc}${obj.key}' was updated. From ${oldValue} to ${newValue}\n`;
      }
      if (obj.type === 'new') {
        const value = obj.children instanceof Object ? 'complex value' : `value: ${obj.value}`;
        return `${acc}${obj.key}' was added with ${value}\n`;
      }
      if (obj.type === 'deleted') {
        return `${acc}${obj.key}' was removed\n`;
      }
      return acc;
    }, '');

  const msgs = inner(ast).split('\n')
    .reduce((accum, value) => (value ? `${accum}Property '${value}\n` : accum), '')
    .slice(0, -1);
  return msgs;
};

export const jsonRender = (ast) => {
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

export default indentRender;

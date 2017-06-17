import _ from 'lodash';

export const indentRender = (ast) => {
  const inner = (astObj, depth = 0, indent = '\t') => {
    const getIndent = (depthNum) => {
      if (depthNum <= 0) {
        return '';
      }
      return `${indent}${getIndent(depthNum - 1)}`;
    };
    return astObj.map((obj) => {
      const key = obj.key ? `${obj.key}: ` : '';
      const ind = getIndent(depth);
      if (obj.type === 'nested') {
        const value = inner(obj.children, depth + 1, indent);
        return `\n${ind}  ${key}{${value}\n${ind}}`;
      }
      if (obj.type === 'changed') {
        const oldValue = obj.old instanceof Object ? `{${inner(obj.old, depth + 1, indent)}\n${ind}}` : obj.old;
        const newValue = obj.new instanceof Object ? `{${inner(obj.new, depth + 1, indent)}\n${ind}}` : obj.new;
        return `\n${ind}+ ${key}${newValue}\n${ind}- ${key}${oldValue}`;
      }
      if (obj.type === 'new') {
        const value = obj.children instanceof Object ? `{${inner(obj.children, depth + 1, indent)}\n${ind}}` : obj.value;
        return `\n${ind}+ ${key}${value}`;
      }
      if (obj.type === 'deleted') {
        const value = obj.children instanceof Object ? `{${inner(obj.children, depth + 1, indent)}\n${ind}}` : obj.value;
        return `\n${ind}- ${key}${value}`;
      }
      const value = obj.children instanceof Object ? `{${inner(obj.children, depth + 1, indent)}\n${ind}}` : obj.value;
      return `\n${ind}  ${key}${value}`;
    }).join('');
  };

  const astStr = inner(ast, 1, '\t');
  return `{${astStr}\n}`;
};

export const plainRender = (astObj) => {
  const inner = (ast) => {
    const keysObj = _.groupBy(ast.children, 'name');
    const msgs = _.reduce(keysObj, (acc, values, key) => {
      if (values.length === 2) {
        const value1 = values[1].value ? `'${values[1].value}'` : 'complex value';
        const value0 = values[0].value ? `'${values[0].value}'` : 'complex value';
        return `${acc}${key}' was updated. From ${value1} to ${value0}\n`;
      }
      if (values[0].type === 'new') {
        const value = values[0].value ? `value: ${values[0].value}` : 'complex value';
        return `${acc}${values[0].name}' was added with ${value}\n`;
      }
      if (values[0].type === 'deleted') {
        return `${acc}${values[0].name}' was removed\n`;
      }
      if ((values[0].type === 'original') && !(values[0].value)) {
        const childrenRender = inner(values[0], key)
                                .split('\n')
                                .reduce((accum, value) => (value ? `${accum}${key}.${value}\n` : accum), '');
        return `${acc}${childrenRender}`;
      }
      return `${acc}`;
    }, '');
    return msgs;
  };
  return inner(astObj)
            .split('\n')
            .reduce((accum, value) => (value ? `${accum}Property '${value}\n` : accum), '')
            .slice(0, -1);
};

export default indentRender;

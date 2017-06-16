import _ from 'lodash';

export const indentRender = astObj => astObj.toString();

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
            .reduce((accum, value) => (value ? `${accum}'${value}\n` : accum), '')
            .slice(0, -1);
};

export default indentRender;

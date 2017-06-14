import _ from 'lodash';

const genAst = (data1, data2) => {
  const iter = (obj1, obj2, acc) => {
    if (!(obj1 instanceof Object) && !(obj2 instanceof Object)) {
      return obj1 === obj2 ? obj1 : { first: obj1, second: obj2 };
    }
    if ((obj1 instanceof Object) && !(obj2 instanceof Object)) {
      return { first: iter(obj1, obj1, acc), second: obj2 };
    }
    if (!(obj1 instanceof Object) && (obj2 instanceof Object)) {
      return { first: obj1, second: iter(obj2, obj2, acc) };
    }

    const keys = _.union(Object.keys(obj1), Object.keys(obj2));
    return keys.reduce((ast, key) => {
      if ((key in obj1) && (key in obj2)) {
        ast.push({ type: 'original', name: key, value: iter(obj1[key], obj2[key], []) });
        return ast;
      }
      if (obj1[key]) {
        ast.push({ type: 'deleted', name: key, value: iter(obj1[key], obj1[key], []) });
        return ast;
      }
      ast.push({ type: 'new', name: key, value: iter(obj2[key], obj2[key], []) });
      return ast;
    }, acc);
  };

  return { type: '', value: iter(data1, data2, []) };
};

const getSign = (type) => {
  switch (type) {
    case 'deleted':
      return '- ';
    case 'new':
      return '+ ';
    case 'original':
      return '  ';
    default:
      return '';
  }
};

const render = (astObj) => {
  const iter = (ast, depth) => {
    const name = ast.name ? `${ast.name}: ` : '';
    const sign = getSign(ast.type);

    if (ast.value instanceof Array) {
      const strAst = ast.value.reduce((acc, value) => {
        if (value.value instanceof Array) {
          return `${acc}${iter(value, `${depth}\t`)}`;
        }
        return `${acc}${iter(value, `${depth}\t`)}`;
      }, '');
      return `${depth}${sign}${name}{${strAst}${depth}}`;
    }
    if (ast.value instanceof Object) {
      if (ast.value.first === ast.value.second) {
        return `${depth}${sign}${name}${ast.value.first}`;
      }
      const getCompareStr = (astValue, type) => {
        if (astValue instanceof Object) {
          return iter({ name: ast.name, type, value: astValue }, depth);
        }
        return `${depth}${getSign(type)}${name}${astValue}`;
      };

      const secondValue = getCompareStr(ast.value.second, 'new');
      const firstValue = getCompareStr(ast.value.first, 'deleted');
      return `${secondValue}${firstValue}`;
    }
    return `${depth}${sign}${name}${ast.value}`;
  };

  return iter(astObj, '\n').substr(1);
};

export default (data1, data2) => {
  const ast = genAst(data1, data2);
  // console.log(JSON.stringify(ast, null, '  '));
  return render(ast);
};

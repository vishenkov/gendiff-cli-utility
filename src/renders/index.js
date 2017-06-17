import indentRender from './indent';
import plainRender from './plain';
import jsonRender from './json';

export default (opt) => {
  switch (opt) {
    case 'indent':
      return indentRender;
    case 'plain':
      return plainRender;
    case 'json':
      return jsonRender;
    default:
      throw new Error(`${opt} format isn\`t supported!`);
  }
};

export default class Node {
  constructor(name, type, value, children) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.children = children || [];
  }

  getTypeString() {
    switch (this.type) {
      case 'deleted':
        return '-';
      case 'new':
        return '+';
      case 'original':
        return ' ';
      default:
        return '';
    }
  }

  toString(depth = 0, indent = '\t') {
    const getIndent = (depthNum) => {
      if (depthNum <= 0) {
        return '';
      }
      return `${indent}${getIndent(depthNum - 1)}`;
    };

    const currentDepth = getIndent(depth);
    const childrenStr = this.children.map(child => child.toString(depth + 1, indent)).join('\n');
    const nameStr = this.name ? `${currentDepth}${this.getTypeString()} ${this.name}: ` : '';
    const value = this.value ? `${this.value}` : '';
    return `${nameStr}${value}${childrenStr ? `{\n${childrenStr}\n${currentDepth}}` : ''}`;
  }
}

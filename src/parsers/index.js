import yaml from 'js-yaml';
import ini from 'ini';

export default (ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      throw new Error(`${ext} isn\`t supported!`);
  }
};

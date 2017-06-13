import yaml from 'js-yaml';
import ini from 'ini';

const jsonParser = data => JSON.parse(data);

const yamlParser = data => yaml.safeLoad(data);

const iniParser = data => ini.parse(data);

export default (ext) => {
  switch (ext) {
    case '.json':
      return jsonParser;
    case '.yml':
      return yamlParser;
    case '.ini':
      return iniParser;
    default:
      throw new Error(`${ext} isn\`t supported!`);
  }
};

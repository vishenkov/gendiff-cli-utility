import yaml from 'js-yaml';

const jsonParser = data => JSON.parse(data);

const yamlParser = data => yaml.safeLoad(data);

export default (ext) => {
  switch (ext) {
    case '.json':
      return jsonParser;
    case '.yml':
      return yamlParser;
    default:
      throw new Error(`${ext} isn\`t supported!`);
  }
};

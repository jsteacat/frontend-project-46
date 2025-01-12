import yaml from 'js-yaml';

export default (data) => {
  return yaml.load(data);
}

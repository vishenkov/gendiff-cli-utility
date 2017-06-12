import program from 'commander';
import gendiff from './';

export default () => {
  program
    .version('0.0.3')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      gendiff(firstConfig, secondConfig);
    })
    .parse(process.argv);
};

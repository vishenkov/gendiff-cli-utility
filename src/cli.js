import program from 'commander';
import gendiff from './';

export default () => {
  program
    .version('0.0.6')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(gendiff(firstConfig, secondConfig));
    })
    .parse(process.argv);
};

import program from 'commander';
import gendiff from './';
import * as render from './renders';

export default () => {
  program
    .version('0.0.11')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const renderDiff = program.format ?
          render[`${program.format}Render`]
        : render.indentRender;
      if (typeof renderDiff === 'undefined') {
        throw new Error(`-f ${program.format} isn\`t supported!`);
      }
      console.log(gendiff(firstConfig, secondConfig, renderDiff));
    })
    .parse(process.argv);
};

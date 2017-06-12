import program from 'commander';

export default () => {
  const config = {};
  program
    .version('0.0.3')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      config.firstConfig = firstConfig;
      config.secondConfig = secondConfig;
    })
    .parse(process.argv);

  config.format = program.format;
  console.log(`first: ${config.firstConfig}\nsecond: ${config.secondConfig}`);
  console.log(`${config.format ? config.format : 'no format opt'}`);

  return config;
};

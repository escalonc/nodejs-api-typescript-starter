import defaultConfiguration from './default';

const environment = process.env.NODE_ENV || 'development';
const environmentConfiguration = import(`./${environment}`);

const mergedConfig: any = {
  ...defaultConfiguration,
  ...environmentConfiguration
};

export default mergedConfig;

import BaseConfiguration from "../common/bbaseConfiguration";
import defaultConfiguration from "./default";

const environment = process.env.NODE_ENV || "development";
const environmentConfiguration = import(`./${environment}`);

const mergedConfig: BaseConfiguration = {
  ...defaultConfiguration,
  ...environmentConfiguration,
};

export default mergedConfig;

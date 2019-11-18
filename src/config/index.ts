import BaseConfiguration from "../common/baseConfiguration";
import defaultConfiguration from "./default";

const environment = process.env.NODE_ENV || "development";
const environmentConfiguration = import(`./${environment}`);

const mergedConfig: BaseConfiguration = {
  ...defaultConfiguration,
  ...environmentConfiguration,
};

export default mergedConfig;

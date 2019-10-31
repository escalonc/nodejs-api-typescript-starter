import BaseConfiguration from "../common/baseConfiguration";

const config: BaseConfiguration = {
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
};

export default config;

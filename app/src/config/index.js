import env from 'react-native-config';

const config = {
  api: {
    isProduction: env.IS_PRODUCTION,
    apiHost: env.API_HOST,
  },
};

const IS_PRODUCTION = config.api.isProduction;
const API_HOST = config.api.apiHost;

export {IS_PRODUCTION, API_HOST};

export default config;

import config from '../config.json';

export const environment = {
  production: true,
  API_KEY: config.API_KEY_OPEN_IA,
  API_URL: config.API_URL,
  API_URL_AI: config.API_URL_AI,
};

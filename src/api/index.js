import { httpClient } from './httpClient';
import { spaceXApi } from './spaceXApi';

export function apiFactory(http) {
  return {
    spaceX: spaceXApi(http)
  };
}

const DEFAULT_PORT = process.env.PORT || 80;
const HOST = process.env.HOST || '0.0.0.0';

console.log(" process.env.PORT: ", process.env.PORT, "     HOST: ", HOST);

const http = httpClient(`${HOST}:${DEFAULT_PORT}`);
export const api = apiFactory(http);

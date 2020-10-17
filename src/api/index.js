import { httpClient } from './httpClient';
import { todosApi } from './todosApi';

export function apiFactory(http) {
  return {
    todos: todosApi(http)
  };
}

const DEFAULT_PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

console.log(" process.env.PORT: ", process.env.PORT, "     HOST: ", HOST);

const http = httpClient(`${HOST}:${DEFAULT_PORT}`);
export const api = apiFactory(http);

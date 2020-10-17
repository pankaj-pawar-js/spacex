import { httpClient } from './httpClient';
import { todosApi } from './todosApi';

export function apiFactory(http) {
  return {
    todos: todosApi(http)
  };
}

// console.log(" process.env.PORT: ", process.env.PORT);

const DEFAULT_PORT = process.env.PORT || 3000;

const http = httpClient(`http://localhost:${DEFAULT_PORT}`);
export const api = apiFactory(http);

import { Router } from 'express';
import fetch from 'isomorphic-unfetch';

export const todoRoutes = () => {
  const todoRoutes = new Router();

  todoRoutes.get('/api/v1/spacex', (_req, res) => {
    fetch('https://api.spacexdata.com/v3/launches?limit=100').then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return { data: res.text() };
    });
  });

  todoRoutes.post('/api/todos', (req, res) => {
    const newTodo = req.body;
    newTodo.id = Date.now();

    todos.push(newTodo);

    setTimeout(() => {
      res.json(newTodo);
    }, 100);
  });

  return todoRoutes;
};

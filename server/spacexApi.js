import { Router } from 'express';
import fetch from 'isomorphic-unfetch';

export const spaceXRoutes = () => {
  const router = new Router();

  router.get('/api/v1/spacex', (_req, res) => {
    fetch('https://api.spacexdata.com/v3/launches?limit=100').then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return { data: res.text() };
    });
  });


  return router;
};

import type { Application, Request, Response } from 'express';
import express from 'express';
import { fetchCity } from './api';
export default class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        cityName: '/api/ankara',
      });
    });

    this.app.get('/api/:cityName', async (req: Request, res: Response) => {
      const cityName = req.params.cityName.toLocaleLowerCase();
      const weatherDataList = await fetchCity(cityName);
      res.status(200).json(weatherDataList);
    });

    this.app.get('*', (req: Request, res: Response) => {
      res.status(404).send('Not Found');
    });
  }
}

export const app = new App();

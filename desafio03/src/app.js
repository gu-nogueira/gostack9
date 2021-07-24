import express from 'express';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    console.timeLog("Load time");
    console.log('Loading routes...');

    this.middlewares();
    this.routes();

    console.timeEnd("Load time");
    console.log('App build: OK');
  }
  middlewares() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

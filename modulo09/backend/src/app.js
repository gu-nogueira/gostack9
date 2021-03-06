import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import routes from './routes';

import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    console.timeLog('Load time');
    console.log('Loading routes...');

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    console.timeEnd('Load time');
    console.log('Complete!');
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler({ ip: true }));
    this.server.use(cors());
    this.server.use(Sentry.Handlers.tracingHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV == 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;

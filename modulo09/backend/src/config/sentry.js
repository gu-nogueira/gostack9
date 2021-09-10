import * as Sentry from '@sentry/node';
import * as Tracing from "@sentry/tracing";
import app from './../app';

export default {
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express( app ),
  ],
  tracesSampleRate: 1.0,
};

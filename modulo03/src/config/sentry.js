import * as Sentry from '@sentry/node';
import * as Tracing from "@sentry/tracing";
import app from './../app';

export default {
  dsn: 'https://22f00432e0a647f0b1f4da12e01b8b33@o923985.ingest.sentry.io/5871871',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express( app ),
  ],
  tracesSampleRate: 1.0,
};

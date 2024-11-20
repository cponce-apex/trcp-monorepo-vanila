// ---Dependencies
import express from 'express';
// ---Middlewares
// ---DB stuff
// ---Constants
import { healthRoutes } from './src/express/routes/health';

const debugProd = require('debug')('app:prod');

/** Main wrapper */
function main() {
  // ---------------- CONFIG
  const app = express();
  // ---------------- MIDDLEWARES
  app.use(express.json()); // Needed to read req.body
  // customHelmet(app);
  // morganlogger(app);

  // ---------------- ROUTES
  app.use('/health/', healthRoutes);

  // ---------------- SSL
  // eslint-disable-next-line global-require
  const http = require('http');

  // const trySSL = process.env.USE_SSL || false; // Set use of https from enviroment

  const server = http;
  const options = {}; // Get ssl certs if https true
  const APP_PORT = process.env.APP_PORT || 4000;
  // ---------------- SERVER
  server.createServer(options, app).listen(APP_PORT, () => {
    debugProd(`https: ${false}, listening to port ${APP_PORT}...`);
  });
}

main();

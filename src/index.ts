import {log} from './log';
import {json} from 'body-parser';
import createApolloServer from './graph/createApolloServer';
import express from 'express';
import {filmsRouter} from './rest/films';
import container from './services/container';
import exitHook from 'exit-hook';

// cross-env TOKEN=777 yarn ts-node-dev src/index.ts

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

app.use('/films', filmsRouter);

app.get('/', (_req, res) => {
  res.send({message: 'Hello World!'});
});

async function start() {
  const server = createApolloServer();

  server
    .start()
    .then(() => server.applyMiddleware({app, path: '/graph'}));

  app.listen(port, () => {
    log.info(`Example app listening on port ${port}`);
  });
}

exitHook(() => {
  log.info('exitHook');
  container.unbindAll();
});

start()
  .catch((error) => {
    throw error;
  });

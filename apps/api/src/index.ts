import { createServer } from './server';
import { cfg } from './config';
import { logger } from './logger';

const start = async () => {
  const app = await createServer();
  app.listen(cfg.PORT, () => {
    logger.info(`API listening on http://localhost:${cfg.PORT}`);
    logger.info(`GraphQL at http://localhost:${cfg.PORT}/graphql`);
    logger.info(`Health at  http://localhost:${cfg.PORT}/health`);
  });
};

start().catch(err => {
  console.error(err);
  process.exit(1);
});

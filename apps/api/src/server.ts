import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schema';
import { makeContext } from './context';

export async function createServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // Healthcheck
  app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

  const apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();
  app.use('/graphql', expressMiddleware(apollo, { context: async () => makeContext() }));

  return app;
}

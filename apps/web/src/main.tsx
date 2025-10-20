import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import App from './App';

const link = createHttpLink({ uri: (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/graphql' });
const client = new ApolloClient({ link, cache: new InMemoryCache() });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}><App/></ApolloProvider>
);

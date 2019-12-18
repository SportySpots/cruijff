import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
import { print } from 'graphql';

import SeedorfAPI from '../Services/SeedorfApi';

const httpLink = createHttpLink({ uri: config.seedorfGraphQLUrl });

const authMiddleware = setContext(async (req, { headers }) => {
  // Get the authentication token from async storage if it exists
  const token = await AsyncStorage.getItem('TOKEN');
  // Set auth header for the REST API
  SeedorfAPI.setToken(token);
  // console.log('SET GRAPHQL CONTEXT');
  // console.log(print(req.query));
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : null,
      cookie: null,
    },
  };
});

export const addErrorHandlers = link => ApolloLink.from([
  onError(({ operation, graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        console.log(print(operation.query));
      });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  link,
]);

export const cache = new InMemoryCache({ dataIdFromObject: object => (object as any).uuid || null });

const client = new ApolloClient({
  link: addErrorHandlers(authMiddleware.concat(httpLink)),
  cache,
});

export default client;


// export const createClient = (uri) => {
//   let token = null;
//   const middlewareLink = new ApolloLink((operation, forward) => {
//     if (config.logGraphQLQueries) console.log(operation);
//     operation.setContext({
//       headers: {
//         authorization: token ? `JWT ${token}` : null,
//         cookie: null,
//       },
//     });
//     return forward(operation);
//   });

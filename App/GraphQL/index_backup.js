// import { InMemoryCache } from 'apollo-cache-inmemory';
// import ApolloClient from 'apollo-client';
// import ApolloProvider from 'react-apollo/ApolloProvider';
// import { ApolloLink } from 'apollo-link';
// import { onError } from 'apollo-link-error';
// import { HttpLink } from 'apollo-link-http';
// import { SchemaLink } from 'apollo-link-schema';
// import { buildClientSchema } from 'graphql';
// import { addMockFunctionsToSchema } from 'graphql-tools';
// import React from 'react';
// import settings from '../config';
// import mocks from './mocks';

// // TODO: cleanup, solve eslint errors
// export let client = null;

// const createCache = () =>
//   new InMemoryCache({
//     dataIdFromObject: object => object.uuid || null,
//   });

// const addErrorHandlers = link =>
//   ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors) {
//         graphQLErrors.forEach(({ message, locations, path }) => {
//           console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
//         });
//       }
//       if (networkError) console.log(`[Network error]: ${networkError}`);
//     }),
//     link,
//   ]);

// export const createClient = (uri) => {
//   let token = null;
//   const middlewareLink = new ApolloLink((operation, forward) => {
//     if (settings.logGraphQLQueries) console.log(operation);
//     operation.setContext({
//       headers: {
//         authorization: token ? `JWT ${token}` : null,
//         cookie: null,
//       },
//     });
//     return forward(operation);
//   });

//   const httpLink = new HttpLink({
//     uri,
//   });

//   client = new ApolloClient({
//     link: addErrorHandlers(middlewareLink.concat(httpLink)),
//     cache: createCache(),
//   });
//   client.setToken = (t) => {
//     token = t;
//   };
//   return client;
// };

// export const createMockClient = () => {
//   const schema = buildClientSchema(require('../../schema.graphql.json'));
//   addMockFunctionsToSchema({
//     schema,
//     mocks,
//     preserveResolvers: false,
//   });
//   client = new ApolloClient({
//     cache: createCache(),
//     link: addErrorHandlers(new SchemaLink({ schema })),
//   });
//   client.setToken = () => null;
//   return client;
// };

// export const ApolloMockProvider = ({ children }) => (
//   <ApolloProvider client={createMockClient()}>
//     {children}
//   </ApolloProvider>
// );

// export const withApolloMockProvider = (Component) => {
//   const ApolloComponent = props => (
//     <ApolloMockProvider>
//       <Component {...props} />
//     </ApolloMockProvider>
//   );

//   return ApolloComponent;
// };

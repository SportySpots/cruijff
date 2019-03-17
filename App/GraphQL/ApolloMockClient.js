import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import ApolloProvider from 'react-apollo/ApolloProvider';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { SchemaLink } from 'apollo-link-schema';
import { buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';
import React from 'react';
import mocks from './mocks';

// Read schema from file
const schema = buildClientSchema(require('../../schema.graphql.json'));

// Add mocked resolvers
addMockFunctionsToSchema({ schema, mocks, preserveResolvers: false });

// TODO: import from ApolloClient.js
const addErrorHandlers = link => ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  link,
]);

const mockClient = new ApolloClient({
  link: addErrorHandlers(new SchemaLink({ schema })),
  cache: new InMemoryCache({ dataIdFromObject: object => object.uuid || null }),
});

export default mockClient;

export const ApolloMockProvider = ({ children }) => (
  <ApolloProvider client={mockClient}>
    {children}
  </ApolloProvider>
);

export const withApolloMockProvider = (Component) => {
  const ApolloComponent = props => (
    <ApolloMockProvider>
      <Component {...props} />
    </ApolloMockProvider>
  );

  return ApolloComponent;
};

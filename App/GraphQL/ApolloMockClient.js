import ApolloClient from 'apollo-client';
import ApolloProvider from 'react-apollo/ApolloProvider';
import { SchemaLink } from 'apollo-link-schema';
import { buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';
import React from 'react';
import { addErrorHandlers, cache } from './ApolloClient';
import mocks from './mocks';

// Read schema from file
const schema = buildClientSchema(require('../../schema.graphql.json'));

// Add mocked resolvers
addMockFunctionsToSchema({ schema, mocks, preserveResolvers: false });

const mockClient = new ApolloClient({
  link: addErrorHandlers(new SchemaLink({ schema })),
  cache,
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

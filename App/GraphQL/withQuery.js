/* import React from 'react';
import { Query } from 'react-apollo';
import Text from '../Components/Common/Text';
import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

const withQuery = query => Component => props => (
  <Query query={query} variables={props.variables}>
    {({
 loading, error, data, refetch,
}) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;
      return <Component {...props} loading={loading} error={error} data={data} refetch={refetch} />;
    }}
  </Query>
);

export default withQuery; */

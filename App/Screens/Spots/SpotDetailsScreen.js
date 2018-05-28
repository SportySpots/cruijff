import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import spotQuery from '../../GraphQL/Spots/Queries/spot';
import Text from '../../Components/Text';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';
import SpotDetails from '../../Components/Spots/SpotDetails';

const SpotDetailsScreen = ({ navigation, userId }) => (
  <Query
    query={spotQuery}
    variables={{
      uuid: navigation.state.params.uuid,
      user_uuid: userId,
    }}
  >
    {({ loading, error, data }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

      return (
        <SpotDetails spot={data.spot} userId={userId} />
      );
    }}
  </Query>
);

SpotDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

const withRedux = connect(state => ({ userId: state.user.uuid }));

export default withRedux(SpotDetailsScreen);

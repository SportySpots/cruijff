import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import GET_SPOT_DETAILS from '../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import Text from '../../Components/Text';
import CenteredActivityIndicator from '../../Components/Common/CenteredActivityIndicator';
import SpotDetails from '../../Components/Spots/SpotDetails';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotDetailsScreen = ({ navigation, userId }) => (
  <Query
    query={GET_SPOT_DETAILS}
    variables={{
      uuid: navigation.state.params.uuid,
      user_uuid: userId,
    }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

      return (
        <SpotDetails
          spot={data.spot}
          userId={userId}
        />
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
  userId: PropTypes.string,
};

SpotDetailsScreen.defaultProps = {
  userId: null,
};

const withRedux = connect(state => ({ userId: state.user.uuid }));

export default withRedux(SpotDetailsScreen);

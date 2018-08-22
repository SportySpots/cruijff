import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import GET_SPOTS from '../../GraphQL/Spots/Queries/GET_SPOTS';
import Text from '../../Components/Common/Text';
import Card from '../../Components/Spots/SpotListCardSmall';
import SpotsMapWithListFallback from '../../Components/Spots/SpotsMapWithListFallback';
import CenteredActivityIndicator from '../../Components/Common/CenteredActivityIndicator';

// TODO: handle no spots were found case --> probably handle this on SpotsMap
// and SpotsList components

class SpotsMapScreen extends React.Component {
  handleCardPress = (spotId) => {
    this.props.navigation.navigate('SpotDetailsScreen', {
      uuid: spotId,
    });
  };

  render() {
    return (
      <Query query={GET_SPOTS}>
        {({ loading, error, data }) => {
          if (loading) return <CenteredActivityIndicator />;
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

          return (
            <SpotsMapWithListFallback
              spots={data.spots}
              cardComponent={Card}
              onCardPress={this.handleCardPress}
            />
          );
        }}
      </Query>
    );
  }
}

SpotsMapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SpotsMapScreen;

import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import spotsQuery from '../../GraphQL/Spots/Queries/spots';
import Text from '../../Components/Text';
import Card from '../../Components/Spots/SpotListCardSmall';
import SpotsMapWithListFallback from '../../Components/Spots/SpotsMapWithListFallback';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';

// TODO: handle no spots were found case --> probably handle this on SpotsMap
// and SpotsList components

const SpotsMapScreen = ({ navigation }) => {
  const handleCardPress = (spotId) => {
    navigation.navigate('SpotDetailsScreen', {
      uuid: spotId,
    });
  };

  return (
    <Query query={spotsQuery}>
      {({ loading, error, data }) => {
        if (loading) return <CenteredActivityIndicator />;
        if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

        return (
          <SpotsMapWithListFallback
            spots={data.spots}
            cardComponent={Card}
            onCardPress={handleCardPress}
          />
        );
      }}
    </Query>
  );
};

SpotsMapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SpotsMapScreen;

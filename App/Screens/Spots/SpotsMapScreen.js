import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import Card from '../../Components/Spots/SpotMapCardSmall';
import SpotsMapWithListFallback from '../../Components/Spots/SpotsMapWithListFallback';
import Text from '../../Components/Text';
import { GET_SPOTS } from './SpotsListScreen';

// TODO: handle no spots were found case --> probably handle this on SpotsMap
// and SpotsList components

const SpotsMapScreen = ({ navigation }) => {
  const handleCardPress = (spotId) => {
    navigation.navigate('SpotDetailsScreen', {
      uuid: spotId,
    });
  };

  return (
    <Query query={GET_SPOTS}>
      {({ loading, error, data }) => {
        if (loading) return <Text>Loading...</Text>;
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

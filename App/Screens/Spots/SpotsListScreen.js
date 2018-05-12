import React from 'react';

// import gql from 'graphql-tag';
import SpotsList from '../../Components/Spots/SpotsList';
import withQuery from '../../GraphQL/withQuery';
import spotsQuery from '../../GraphQL/Spots/Queries/spots';
import Card from '../../Components/Spots/SpotListCard';

class SpotsListScreen extends React.Component {
  handleCardPress = (spotId) => {
    this.props.navigation.navigate('SpotDetailsScreen', {
      uuid: spotId,
    });
  };

  render() {
    const Contents = withQuery(spotsQuery)(SpotsList);
    return (
      <Contents
        cardComponent={Card}
        onCardPress={uuid => this.handleCardPress(uuid)}
        style={this.props.style}
      />
    );
  }
}

export default SpotsListScreen;

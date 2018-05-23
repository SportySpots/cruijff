import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import Card from '../../Components/Spots/SpotListCard';
import SpotsList from '../../Components/Spots/SpotsList';
import withQuery from '../../GraphQL/withQuery';

export const GET_SPOTS = gql`
  {
    spots {
      uuid
      name
      address {
        lat
        lng
      }
      images {
        image
        sport {
          uuid
        }
      }
      sports {
        category
      }
      spot_games {
        uuid
      }
    }
  }
`;

class SpotsListScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleCardPress = (spotId) => {
    this.props.navigation.navigate('SpotDetailsScreen', {
      uuid: spotId,
    });
  };

  render() {
    const Contents = withQuery(GET_SPOTS)(SpotsList);
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

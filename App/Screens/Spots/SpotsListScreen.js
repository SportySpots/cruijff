import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import SpotsList from '../../Components/Spots/SpotsList';
// import withQuery from '../../GraphQL/withQuery';
import spotsQuery from '../../GraphQL/Spots/Queries/spots';
import Text from '../../Components/Text';
import Card from '../../Components/Spots/SpotListCard';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';

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
    return (
      <Query query={spotsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <CenteredActivityIndicator />;
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

          if (!data || !data.spots) {
            return <Text>No data!</Text>;
          }

          return (
            <SpotsList
              spots={data.spots}
              cardComponent={Card}
              onCardPress={uuid => this.handleCardPress(uuid)}
              style={this.props.style}
            />
          );
        }}
      </Query>
    );
  }
}

export default SpotsListScreen;

/*
import React from 'react';
import PropTypes from 'prop-types';
import SpotsList from '../../Components/Spots/SpotsList';
import withQuery from '../../GraphQL/withQuery';
import spotsQuery from '../../GraphQL/Spots/Queries/spots';
import Card from '../../Components/Spots/SpotListCard';

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
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { withUser, userPropTypes } from '../../../Context/User';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import Block from '../../../Components/Common/Block';
import Text from '../../../Components/Common/Text';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import GamesList from '../../../Components/Games/GamesList';
import SpotDetails from '../../../Components/Spots/SpotDetails';
import curatedGames from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(ScrollView)`
  background-color: ${Colors.concrete};
`;
//------------------------------------------------------------------------------
const GamesContainer = styled.View`
  padding: 0 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: implement pagination
class SpotDetailsScreen extends React.PureComponent {
  handleGamePress = (game) => {
    const { navigation } = this.props;
    navigation.navigate('GameDetailsScreen', { uuid: game.uuid });
  }

  render() {
    const { navigation, user } = this.props;

    return (
      <Query
        query={GET_SPOT_DETAILS}
        variables={{ uuid: navigation.state.params.uuid }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return <CenteredActivityIndicator />;
          if (error) return <Text>{JSON.stringify(error)}</Text>;
          if (!data || !data.spot) return null;

          const { spot } = data;
          // Filter passed games
          const games = (spot.games && curatedGames(spot.games)) || [];

          return (
            <Container>
              <SpotDetails
                spot={spot}
                userUUID={(user && user.uuid) || null}
                onGamePress={this.handleGamePress}
              />
              <Block>
                <Text.ML>{I18n.t('Games')}</Text.ML>
              </Block>
              <GamesContainer>
                <GamesList
                  games={games}
                  onCardPress={this.handleGamePress}
                  contentContainerStyle={{
                    flexGrow: 1, // centers not-found-component
                    paddingBottom: 8,
                    minHeight: 200,
                  }}
                />
              </GamesContainer>
            </Container>
          );
        }}
      </Query>
    );
  }
}

SpotDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  user: userPropTypes.user,
};

SpotDetailsScreen.defaultProps = {
  user: null,
};

export default withUser(SpotDetailsScreen);

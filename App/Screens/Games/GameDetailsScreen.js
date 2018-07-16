import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';
import GET_GAME_DETAILS from '../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../Components/Common/CenteredActivityIndicator';
import NothingFound from '../../Components/Common/NothingFound';
import GameDetails from '../../Components/Games/GameDetails';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(ScrollView)`
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class GameDetailsScreen extends React.PureComponent {
  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  handleAttendeesClick = () => {
    const { navigation } = this.props;
    navigation.navigate('GamePlayerScreen', { uuid: this.gameUUID });
  }

  handleRSVPBefore = () => {
    const { user, navigation } = this.props;

    if (!user || !user.uuid) {
      navigation.navigate('ProfileSignupScreen');
      // Throw error in order to interrupt rspv normal flow
      throw new Error(401, 'User not authorized!');
    }
  }

  render() {
    const { user } = this.props;

    return (
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: this.gameUUID }}
        fetchPolicy="network-only"
      >
        {({
          loading,
          error,
          data,
          refetch,
        }) => {
          if (loading) { return <CenteredActivityIndicator />; }
          if (error || !data || !data.game) {
            return (
              <NothingFound
                icon="calendar-plus"
                text={I18n.t('Game not found')}
              />
            );
          }

          return (
            <Container>
              <GameDetails
                navigation={this.props.navigation}
                user={user}
                game={data.game}
                onAttendeesPress={this.handleAttendeesClick}
                rspvBeforeHook={this.handleRSVPBefore}
                rspvSuccessHook={refetch}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

GameDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.object,
};

GameDetailsScreen.defaultProps = {
  user: null,
};

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, null);

export default withRedux(GameDetailsScreen);

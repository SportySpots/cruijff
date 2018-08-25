import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import api from '../../Services/SeedorfApi';
import I18n from '../../I18n';
import Colors from '../../Themes/Colors';
import GET_GAME_DETAILS from '../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../Components/Common/CenteredActivityIndicator';
import NothingFound from '../../Components/Common/NothingFound';
import CancelGame from '../../Components/Games/CancelGame';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(ScrollView)`
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameScreen extends React.PureComponent {
  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  handleAttendeesClick = () => {
    const { navigation } = this.props;
    navigation.navigate('GamePlayerScreen', { uuid: this.gameUUID });
  }

  handleCancel = async () => {
    const { navigation } = this.props;

    try {
      const result = await api.setGameStatus({
        gameUUID: this.gameUUID,
        status: 'Canceled',
      });
      // TODO: refetch

      // After successful cancel, take user back to wherever he was
      // TODO: remove this after cancel banner is implemented
      if (result.ok) {
        navigation.goBack(null);
      }
    } catch (exc) {
      console.log(exc);
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

          // TODO: do not pass navigation down, pass callback instead
          return (
            <Container>
              <CancelGame
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

CancelGameScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.object,
};

CancelGameScreen.defaultProps = {
  user: null,
};

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, null);

export default withRedux(CancelGameScreen);

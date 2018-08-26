import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { Alert } from 'react-native';
import styled from 'styled-components';
import api from '../../Services/SeedorfApi';
import I18n from '../../I18n';
import Colors from '../../Themes/Colors';
import GET_GAME_DETAILS from '../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../Components/Common/CenteredActivityIndicator';
import NothingFound from '../../Components/Common/NothingFound';
import DefaultButton from '../../Components/Common/DefaultButton';
import CancelGame from '../../Components/Games/CancelGame';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.white}
`;
//------------------------------------------------------------------------------
const ButtonContainer = styled.View`
  height: 88px;
  background-color: ${Colors.white}
  border-top-width: 0.5px;
  border-color: ${Colors.lightGray}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameScreen extends React.PureComponent {
  state = {
    disabled: false,
  }

  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  /* handleSpotPress = ({ spotUuid }) => {
    const { navigation } = this.props;
    navigation.navigate('SpotDetailsScreen', { uuid: spotUuid });
  } */

  handleAttendeesPress = () => {
    const { navigation } = this.props;
    navigation.navigate('GamePlayerScreen', { uuid: this.gameUUID });
  }

  handleSubmit = async () => {
    // const { navigation } = this.props;

    this.setState({ disabled: true });

    try {
      const result = await api.setGameStatus({
        gameUUID: this.gameUUID,
        status: 'Canceled',
      });
      // TODO: refetch

      // After successful cancel, take user back to wherever he was
      // TODO: remove this after cancel banner is implemented
      if (result.ok) {
        Alert.alert(
          I18n.t('Activity cancelled successfully'),
          /* I18n.t('Are you sure you want to stop attending?'),
          [
            { text: I18n.t('No'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: I18n.t('Yes'), onPress: () => this.setRSVPStatus(RSVP_STATUSES.DECLINED) },
          ], */
        );
        // navigation.goBack(null);
      }
    } catch (exc) {
      console.log(exc);
    }

    this.setState({ disabled: false });
  }

  render() {
    const { user } = this.props;
    const { disabled } = this.state;

    return (
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: this.gameUUID }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) { return <CenteredActivityIndicator />; }
          if (error || !data || !data.game) {
            return (
              <NothingFound
                icon="calendar-plus"
                text={I18n.t('Game not found')}
              />
            );
          }

          // Only display cancel form if user is the organizer of the activity
          const isOrganizer = (
            user &&
            user.uuid &&
            data.game.organizer &&
            data.game.organizer.uuid &&
            user.uuid === data.game.organizer.uuid
          );

          if (!isOrganizer) {
            return null;
          }

          return [
            <Container key="form">
              <CancelGame
                game={data.game}
                // onSpotPress={this.handleSpotPress}
                onAttendeesPress={this.handleAttendeesPress}
              />
            </Container>,
            <ButtonContainer key="button">
              <DefaultButton
                bgColor={this.disabled ? Colors.gray : Colors.red}
                textColor={Colors.white}
                text={I18n.t('Cancel this activity')}
                disabled={disabled}
                onPress={this.handleSubmit}
              />
            </ButtonContainer>,
          ];
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

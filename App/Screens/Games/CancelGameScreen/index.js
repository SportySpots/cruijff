import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import api from '../../../Services/SeedorfApi';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import DefaultButton from '../../../Components/Common/DefaultButton';
import CancelGame from '../../../Components/Games/CancelGame';
import CancelGameConfirmationModal from '../../../Components/Games/CancelGameConfirmationModal';

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
// TODO: re-write this using render-props
class CancelGameScreen extends React.PureComponent {
  state = {
    cancelMsg: '',
    disabled: false,
    visible: false, // whether or not the modal is visible
  }

  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  openModal = () => {
    this.setState(() => ({ visible: true }));
  };

  closeModal = () => {
    const { navigation } = this.props;
    this.setState(() => ({ visible: false }));
    navigation.goBack(null);
  };

  handleAttendeesPress = () => {
    const { navigation } = this.props;
    navigation.navigate('GamePlayerScreen', { uuid: this.gameUUID });
  }

  handleCancelMsgChange = (cancelMsg) => {
    this.setState({ cancelMsg });
  }

  handleSubmit = async () => {
    const { cancelMsg } = this.state;

    this.setState({ disabled: true });

    try {
      // TODO: pass cancelMsg to api.cancelGame
      const result = await api.setGameStatus({
        gameUUID: this.gameUUID,
        status: 'Canceled',
      });
      // TODO: refetch

      if (result.ok) {
        this.openModal();
      }
    } catch (exc) {
      console.log(exc);
    }

    this.setState({ disabled: false });
  }

  render() {
    const { user } = this.props;
    const { cancelMsg, disabled, visible } = this.state;

    return (
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: this.gameUUID }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) { return <CenteredActivityIndicator />; }
          if (error || !data || !data.game || data.game.status === 'CANCELED') {
            return null;
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
                cancelMsg={cancelMsg}
                onAttendeesPress={this.handleAttendeesPress}
                onCancelMsgChange={this.handleCancelMsgChange}
              />
            </Container>,
            <ButtonContainer key="button">
              <DefaultButton
                bgColor={this.disabled ? Colors.gray : Colors.negative}
                textColor={Colors.white}
                text={I18n.t('Cancel this activity')}
                disabled={disabled}
                onPress={this.handleSubmit}
              />
            </ButtonContainer>,
            <CancelGameConfirmationModal
              key="modal"
              visible={visible}
              onClose={this.closeModal}
            />,
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

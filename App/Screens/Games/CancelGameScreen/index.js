import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import FormProps from '../../../RenderProps/form-props';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import CancelGameApiCall from '../../../Components/Games/CancelGameApiCall';
import CancelGameForm from '../../../Components/Games/CancelGameForm';
import CancelGameDoneModal from '../../../Components/Games/CancelGameDoneModal';
import { addModelState } from '../../../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    addModelState(this, 'cancelDone');
  }

  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  handleAttendeesPress = () => {
    const { navigation } = this.props;
    navigation.navigate('GamePlayerScreen', { uuid: this.gameUUID });
  }

  render() {
    const { user, navigation } = this.props;
    const cancelDoneModal = this.modals.cancelDone;

    return (
      <FormProps>
        {({
          disabled,
          handleBefore,
          handleClientCancel,
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
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
              if (loading) {
                return <CenteredActivityIndicator />;
              }
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
                <CancelGameApiCall
                  key="form"
                  onCancelError={handleServerError}
                  onCancelSuccess={() => {
                    // Extend formProps.handleSuccess' default functionality
                    handleSuccess(cancelDoneModal.show);
                  }}
                >
                  {({ cancelGame }) => (
                    <CancelGameForm
                      game={data.game}
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onClientCancelHook={handleClientCancel}
                      onClientErrorHook={handleClientError}
                      // Call api to store data into DB
                      onSuccessHook={cancelGame}
                      onAttendeesPress={this.handleAttendeesPress}
                    />
                  )}
                </CancelGameApiCall>,
                <CancelGameDoneModal
                  key="modal"
                  visible={cancelDoneModal.isVisible}
                  onClose={() => {
                    cancelDoneModal.hide();
                    // Refetch activity data
                    refetch();
                    // Redirect user to activity display screen
                    navigation.goBack(null);
                  }}
                />,
              ];
            }}
          </Query>
        )}
      </FormProps>
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
  user: PropTypes.object, // eslint-disable-line
};

CancelGameScreen.defaultProps = {
  user: null,
};

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, null);

export default withRedux(CancelGameScreen);

/*
                <CancelGame
                  key="form"
                  game={data.game}
                  // Form props
                  disabled={disabled}
                  onBeforeHook={handleBefore}
                  onClientCancelHook={handleClientCancel}
                  onClientErrorHook={handleClientError}
                  onServerErrorHook={handleServerError}
                  onSuccessHook={() => {
                    // Extend FormProps.handleSuccess default functionality
                    handleSuccess(cancelDoneModal.show);
                  }}
                  // Other props
                  onAttendeesPress={this.handleAttendeesPress}
                />,
*/

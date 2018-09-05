import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import ModalProps from '../../../RenderProps/modal-props';
import FormProps from '../../../RenderProps/form-props';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import CancelGame from '../../../Components/Games/CancelGame';
import CancelGameConfirmationModal from '../../../Components/Games/CancelGameConfirmationModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameScreen extends React.PureComponent {
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

    return (
      <ModalProps>
        {({ visible, openModal, closeModal }) => (
          <FormProps>
            {({
              disabled,
              // errorMsg,
              // successMsg,
              handleBefore,
              handleClientError,
              handleServerError,
              handleSuccess,
            }) => (
              <Query
                query={GET_GAME_DETAILS}
                variables={{ uuid: this.gameUUID }}
                fetchPolicy="network-only"
              >
                {({ loading, error, data, refetch }) => {
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
                    <CancelGame
                      key="form"
                      game={data.game}
                      // Form props
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onClientErrorHook={handleClientError}
                      onServerErrorHook={handleServerError}
                      onSuccessHook={() => {
                        // Extend FormProps.handleSuccess default functionality
                        handleSuccess(() => {
                          openModal();
                        });
                      }}
                      // Other props
                      onAttendeesPress={this.handleAttendeesPress}
                    />,
                    <CancelGameConfirmationModal
                      key="modal"
                      visible={visible}
                      onClose={() => {
                        // Extend ModalProps.closeModal default functionality
                        closeModal(() => {
                          // Refetch activity data
                          refetch();
                          // Redirect user to activity display screen
                          navigation.goBack(null);
                        });
                      }}
                    />,
                  ];
                }}
              </Query>
            )}
          </FormProps>
        )}
      </ModalProps>
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

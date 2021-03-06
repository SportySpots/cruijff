import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { addModelState } from '../../../utils';
import I18n from '../../../I18n';
import themeImages from '../../../Themes/Images';
import FormProps from '../../../RenderProps/form-props';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import CancelGameApiCall from '../../../Components/Games/CancelGameApiCall';
import CancelGameForm from '../../../Components/Games/CancelGameForm';
import ImageModal from '../../../Components/Common/Modals/ImageModal';
import {observer} from "mobx-react";
import userStore from 'App/Stores/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
@observer
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
    navigation.navigate('GamePlayersScreen', { uuid: this.gameUUID });
  }

  render() {
    const { navigation } = this.props;
    const cancelDoneModal = this.modals.cancelDone;
    const user = userStore.user;

    return (
      <FormProps>
        {({
          disabled,
          errors,
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
                user
                && user.uuid
                && data.game.organizer
                && data.game.organizer.uuid
                && user.uuid === data.game.organizer.uuid
              );

              if (!isOrganizer) {
                return null;
              }

              const handleModalClose = () => {
                cancelDoneModal.hide();
                // Refetch activity data
                refetch();
                // Redirect user to activity display screen
                navigation.goBack(null);
              };

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
                      errors={errors}
                      onBeforeHook={handleBefore}
                      onClientCancelHook={handleClientCancel}
                      onClientErrorHook={handleClientError}
                      // Call api to store data into DB
                      onSuccessHook={cancelGame}
                      onAttendeesPress={this.handleAttendeesPress}
                    />
                  )}
                </CancelGameApiCall>,
                <ImageModal
                  key="modal"
                  modalComponent="ConfirmModal"
                  src={themeImages.activityCancelledVisual}
                  title={I18n.t('cancelGameScreen.successCancelModal.title')}
                  visible={cancelDoneModal.isVisible}
                  okBtnLabel={I18n.t('cancelGameScreen.successCancelModal.okBtnLabel')}
                  onClose={handleModalClose}
                  onOk={handleModalClose}
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
};

export default CancelGameScreen;

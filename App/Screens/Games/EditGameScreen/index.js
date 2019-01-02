import React from 'react';
import PropTypes from 'prop-types';
import { Platform, BackHandler } from 'react-native';
import { Query } from 'react-apollo';
import { userPropTypes, withUser } from '../../../Context/User';
import { addModelState } from '../../../utils';
import I18n from '../../../I18n';
import themeImages from '../../../Themes/Images';
import FormProps from '../../../RenderProps/form-props';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import EditGameApiCall from '../../../Components/Games/EditGameApiCall';
import EditGameForm from '../../../Components/Games/EditGameForm';
import ImageModal from '../../../Components/Common/Modals/ImageModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditGameScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    addModelState(this, 'editDone');
  }

  // Handle android back button press
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  handleLeave = () => {
    const { onLeave } = this.props;
    // Pass event up to parent component
    onLeave();

    // Need this for android back handler btn to work
    return true;
  }

  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  render() {
    const { user, navigation } = this.props;
    const editDoneModal = this.modals.editDone;

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
                editDoneModal.hide();
                // Refetch activity data
                refetch();
                // Redirect user to activity display screen
                navigation.goBack(null);
              };

              return [
                <EditGameApiCall
                  key="form"
                  onEditError={handleServerError}
                  onEditSuccess={() => {
                    // Extend formProps.handleSuccess' default functionality
                    handleSuccess(editDoneModal.show);
                  }}
                >
                  {({ updateGame }) => (
                    <EditGameForm
                      game={data.game}
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onClientCancelHook={handleClientCancel}
                      onClientErrorHook={handleClientError}
                      // Call api to store data into DB
                      onSuccessHook={updateGame}
                    />
                  )}
                </EditGameApiCall>,
                <ImageModal
                  key="modal"
                  modalComponent="ConfirmModal"
                  src={themeImages.activitySuccessVisual}
                  title={I18n.t('editGameScreen.editSuccessModal.title')}
                  subtitle={I18n.t('editGameScreen.editSuccessModal.subtitle')}
                  visible={editDoneModal.isVisible}
                  okBtnLabel={I18n.t('editGameScreen.editSuccessModal.okBtnLabel')}
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

EditGameScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  user: userPropTypes.user.isRequired,
  onLeave: PropTypes.func,
};

EditGameScreen.defaultProps = {
  onLeave: () => {},
};

export default withUser(EditGameScreen);

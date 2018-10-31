import React from 'react';
import PropTypes from 'prop-types';
import { Platform, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import FormProps from '../../../RenderProps/form-props';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import EditGameApiCall from '../../../Components/Games/EditGameApiCall';
import EditGameForm from '../../../Components/Games/EditGameForm';
import EditGameDoneModal from '../../../Components/Games/EditGameDoneModal';
import { addModelState } from '../../../utils';

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
                <EditGameDoneModal
                  key="modal"
                  visible={editDoneModal.isVisible}
                  onClose={() => {
                    editDoneModal.hide();
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

EditGameScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.object, // eslint-disable-line
  onLeave: PropTypes.func,
};

EditGameScreen.defaultProps = {
  user: null,
  onLeave: () => {},
};

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, null);

export default withRedux(EditGameScreen);

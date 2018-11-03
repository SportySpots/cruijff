import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { client } from '../../../GraphQL';
import userActions from '../../../Redux/UserRedux';
import FormProps from '../../../RenderProps/form-props';
import SignupApiCall from '../../../Components/Auth/SignupApiCall';
import SignupForm from '../../../Components/Auth/SignupForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: can we get rid of componentWillMount and componentWillReceiveProps?
class SignupScreen extends React.PureComponent {
  componentWillMount() {
    const { user, navigation } = this.props;
    if (user && user.uuid) {
      navigation.navigate('MainNav');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, onSuccessHook } = this.props;

    const userWasLoggedOut = (
      !user
      || !user.uuid
      || user.uuid.trim().length === 0
    );

    const userIsLoggedIn = (
      nextProps.user
      && nextProps.user.uuid
      && nextProps.user.uuid.trim().length > 0
    );

    // Right after the user is logged in, fire success auth callback
    if (userWasLoggedOut && userIsLoggedIn) {
      onSuccessHook();
    }
  }

  render() {
    const { setToken } = this.props;

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
          <SignupApiCall
            onSignupError={handleServerError}
            onSignupSuccess={({ token }) => {
              // Extend formProps.handleSuccess' default functionality
              handleSuccess(() => {
                setToken(token);
                client.resetStore();
                // See componentWillReceiveProps
              });
            }}
          >
            {({ signupUser }) => (
              <SignupForm
                disabled={disabled}
                errors={errors}
                onBeforeHook={handleBefore}
                onClientCancelHook={handleClientCancel}
                onClientErrorHook={handleClientError}
                // Call api to register user
                onSuccessHook={signupUser}
              />
            )}
          </SignupApiCall>
        )}
      </FormProps>
    );
  }
}

SignupScreen.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  setToken: PropTypes.func.isRequired,
  onSuccessHook: PropTypes.func,
};

SignupScreen.defaultProps = {
  onSuccessHook: () => {},
};

// TODO: we need a user provider at top level to avoid using redux over and over again
const mapStateToProps = ({ user }) => ({ user });
const dispatchToProps = { setToken: userActions.setToken };
const withRedux = connect(mapStateToProps, dispatchToProps);

export default withRedux(SignupScreen);

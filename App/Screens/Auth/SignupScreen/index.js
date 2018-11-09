import React from 'react';
import PropTypes from 'prop-types';
import { withUser, userPropTypes } from '../../../Context/User';
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

    const userWasLoggedOut = !user;
    const userIsLoggedIn = !!nextProps.user;

    // Right after the user is logged in, fire success auth callback
    if (userWasLoggedOut && userIsLoggedIn) {
      onSuccessHook();
    }
  }

  render() {
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
            onSignupSuccess={handleSuccess}
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
  user: userPropTypes.user,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

SignupScreen.defaultProps = {
  user: null,
  onSuccessHook: () => {},
};

export default withUser(SignupScreen);

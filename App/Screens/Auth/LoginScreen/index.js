import React from 'react';
import PropTypes from 'prop-types';
// import I18n from '../../../I18n/index';
import { withUser, userPropTypes } from '../../../Context/User';
import FormProps from '../../../RenderProps/form-props';
import LoginApiCall from '../../../Components/Auth/LoginApiCall';
import LoginForm from '../../../Components/Auth/LoginForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: can we get rid of componentWillMount?
class LoginScreen extends React.Component {
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
          <LoginApiCall
            onLoginError={handleServerError}
            onLoginSuccess={handleSuccess}
          >
            {({ loginUser }) => (
              <LoginForm
                disabled={disabled}
                errors={errors}
                onBeforeHook={handleBefore}
                onClientCancelHook={handleClientCancel}
                onClientErrorHook={handleClientError}
                // Call api to authenticate user
                onSuccessHook={loginUser}
              />
            )}
          </LoginApiCall>
        )}
      </FormProps>
    );
  }
}

LoginScreen.propTypes = {
  user: userPropTypes.user,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

LoginScreen.defaultProps = {
  user: null,
  onSuccessHook: () => {},
};

export default withUser(LoginScreen);

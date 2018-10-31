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



/*
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findNodeHandle, TextInput, Linking, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LogoHeaderBackground from '../../../Backgrounds/LogoHeaderBackground';
import DefaultButton from '../../../Components/Common/DefaultButton';
import Text from '../../../Components/Common/Text';
import I18n from '../../../I18n/index';
import userActions, { STATUS } from '../../../Redux/UserRedux';
import api from '../../../Services/SeedorfApi';
import Colors from '../../../Themes/Colors';

const Link = ({ text, href }) => (
  <TouchableOpacity onPress={() => Linking.openURL(href)}>
    <View>
      <Text.M style={{ color: Colors.actionYellow }}>{text}</Text.M>
    </View>
  </TouchableOpacity>
);

Link.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export class _Signup extends Component {
  state = {
    requestStatus: STATUS.IDLE,
    error: null,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  }

  componentWillReceiveProps(nextProps) {
    const userWasLoggedOut = (
      !this.props.user ||
      !this.props.user.uuid ||
      this.props.user.uuid.length === 0
    );

    const userIsLoggedIn = (
      nextProps.user &&
      nextProps.user.uuid &&
      nextProps.user.uuid.length > 0
    );

    // Right after the user is logged in, fire success auth callback
    if (userWasLoggedOut && userIsLoggedIn) {
      this.props.onSuccessHook();
    }
  }

  signupRequest = async () => {
    this.setState({ requestStatus: STATUS.PENDING });
    const result = await api.signup({
      username: this.state.email,
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    });
    if (result.problem) {
      this.setState({
        requestStatus: STATUS.FAILURE,
        error: result.data,
      });
    } else {
      // See componentWillReceiveProps where we fired the onSuccessHook callback
      this.props.setToken(result.data.token);
    }
  };

  componentWillMount() {
    if (this.props.user.uuid) {
      this.props.navigation.navigate('MainNav');
    }
  }

  get requestIsPending() {
    return this.state.requestStatus === STATUS.PENDING;
  }

  get hasError() {
    return this.state.requestStatus === STATUS.FAILURE && this.state.error;
  }

  get error() {
    return this.hasError ? this.state.error : null;
  }

  get signupButtonIsDisabled() {
    return (
      this.requestIsPending ||
      !(this.state.first_name && this.state.last_name && this.state.email && this.state.password)
    );
  }

  scrollAndFocusRef = (refName) => {
    this[refName].focus();
    this.scroll.scrollToFocusedInput(findNodeHandle(this[refName]));
  }

  render() {
    return (
      <KeyboardAwareScrollView testID="signupScrollView" ref={ref => {this.scroll = ref}}>
        <LogoHeaderBackground hideLogo>
          <Form>
            <FieldSet>
              <BlackText>{I18n.t('First name')}</BlackText>
              <Input
                testID="signupFieldFirstName"
                onChangeText={val => this.setState({ first_name: val })}
                editable={!this.requestIsPending}
                autoFocus
                blurOnSubmit={false}
                onSubmitEditing={() => this.scrollAndFocusRef('lastNameField')}
              />
            </FieldSet>
            <FieldSet>
              <BlackText>{I18n.t('Last name')}</BlackText>
              <Input
                testID="signupFieldLastName"
                ref={(ref) => { this.lastNameField = ref; }}
                onChangeText={val => this.setState({ last_name: val })}
                editable={!this.requestIsPending}
                blurOnSubmit={false}
                onSubmitEditing={() => this.scrollAndFocusRef('emailField')}
              />
            </FieldSet>
            <FieldSet>
              <BlackText>{I18n.t('E-mail')}</BlackText>
              {this.hasError &&
                'email' in this.error && (
                  <Error testID="emailError">
                    {I18n.t('username' in this.error
                        ? 'E-mail address in use'
                        : 'Enter a valid e-mail address')}
                  </Error>
                )}
              <Input
                testID="signupFieldEmail"
                ref={(ref) => { this.emailField = ref; }}
                keyboardType="email-address"
                onChangeText={val => this.setState({ email: val })}
                editable={!this.requestIsPending}
                autoCapitalize="none"
                blurOnSubmit={false}
                onSubmitEditing={() => this.scrollAndFocusRef('passwordField')}
              />
            </FieldSet>
            <FieldSet>
              <BlackText>{I18n.t('Password')}</BlackText>
              {this.hasError &&
                'password1' in this.error && (
                  <Error testID="passwordError">{I18n.t('Password needs to be at least 8 characters')}</Error>
                )}
              <Input
                testID="signupFieldPassword"
                ref={(ref) => { this.passwordField = ref; }}
                secureTextEntry
                onChangeText={val => this.setState({ password: val })}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <TermsContainer>
              <Text.M>{I18n.t('By signing up, you are agreeing to the')} </Text.M>
              <Link text={I18n.t('Terms and conditions')} href="https://www.sportyspots.com/terms.html" />
            </TermsContainer>
            <DefaultButton
              testID="signupButtonSubmit"
              bgColor={this.signupButtonIsDisabled ? 'grey' : Colors.actionYellow}
              textColor={Colors.white}
              text={I18n.t('Signup')}
              disabled={this.signupButtonIsDisabled}
              onPress={this.signupRequest}
            />
          </Form>
        </LogoHeaderBackground>
      </KeyboardAwareScrollView>
    );
  }
}

_Signup.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  setToken: PropTypes.func,
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

_Signup.defaultProps = {
  onSuccessHook: () => {},
};

const Signup = connect(state => ({ user: state.user }), {
  setToken: userActions.setToken,
})(_Signup);
export default Signup;

const FieldSet = styled.View`
  margin-top: 8px;
`;
const Error = styled(Text)`
  color: red;
`;
const Input = styled(TextInput)`
  color: black;
  font-size: 16px;
`;

const Form = styled.View`
  width: 100%;
  padding-horizontal: 16px;
`;

const BlackText = styled(Text)`
  color: ${Colors.black};
`;

const TermsContainer = styled.View`
  margin-vertical: 16px;
`;

*/

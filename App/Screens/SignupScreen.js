import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findNodeHandle, TextInput, Linking, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import ReactTimeout from 'react-timeout';
import styled from 'styled-components';
import LogoHeaderBackground from '../Backgrounds/LogoHeaderBackground';
import DefaultButton from '../Components/DefaultButton';
import Text from '../Components/Text';
import I18n from '../I18n/index';
import userActions, { STATUS } from '../Redux/UserRedux';
import api from '../Services/SeedorfApi';
import Colors from '../Themes/Colors';

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
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigation: PropTypes.object,
    setToken: PropTypes.func,
    user: PropTypes.object,
    setTimeout: PropTypes.func.isRequired,
    clearTimeout: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      requestStatus: STATUS.IDLE,
      error: null,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
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
      this.props.setToken(result.data.token);
      // Delay redirect to avoid flickering screen
      this.props.setTimeout(() => {
        this.props.navigation.popToTop();
        this.props.clearTimeout();
      }, 100);
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
    this[refName].root.focus();
    this.scroll.scrollToFocusedInput(findNodeHandle(this[refName]));
  }

  render() {
    return (
      <KeyboardAwareScrollView ref={ref => {this.scroll = ref}}>
        <LogoHeaderBackground hideLogo>
          <Form>
            <FieldSet>
              <BlackText>{I18n.t('First name')}</BlackText>
              <Input
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
                  <Error>
                    {I18n.t('username' in this.error
                        ? 'E-mail address in use'
                        : 'Enter a valid e-mail address')}
                  </Error>
                )}
              <Input
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
                  <Error>{I18n.t('Password needs to be at least 8 characters')}</Error>
                )}
              <Input
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

const Signup = connect(state => ({ user: state.user }), {
  setToken: userActions.setToken,
})(_Signup);
export default ReactTimeout(Signup);

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

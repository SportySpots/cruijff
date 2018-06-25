import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput } from 'react-native';
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

const FieldSet = styled.View`
  margin-top: 16px;
`;

const Error = styled(Text)`
  color: red;
`;

const Input = styled(TextInput)`
  font-size: 16px;
  margin-vertical: 8px;
  padding-vertical: 8px;
  color: black;
`;

const Form = styled.View`
  width: 100%;
  padding-horizontal: 16;
`;

const BlackText = styled(Text)`
  color: ${Colors.black};
`;

class LoginScreen extends Component {
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
      email: '',
      password: '',
    };
  }

  loginRequest = async () => {
    this.setState({ requestStatus: STATUS.PENDING });
    const result = await api.login({
      username: this.state.email,
      email: this.state.email,
      password: this.state.password,
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
    return this.state.requestStatus === STATUS.FAILURE;
  }

  get error() {
    return this.hasError ? this.state.error : null;
  }

  get loginButtonIsDisabled() {
    return this.requestIsPending || !(this.state.email && this.state.password);
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <LogoHeaderBackground hideLogo>
          <Form>
            <FieldSet>
              <BlackText>{I18n.t('E-mail')}</BlackText>
              <Input
                keyboardType="email-address"
                onChangeText={val => this.setState({ email: val })}
                editable={!this.requestIsPending}
                autoFocus
                autoCapitalize="none"
                blurOnSubmit={false}
                onSubmitEditing={() => { this.passwordField.root.focus(); }}
              />
            </FieldSet>
            <FieldSet>
              <BlackText>{I18n.t('Password')}</BlackText>
              {this.hasError && <Error>{I18n.t('Wrong username or password')}</Error>}
              <Input
                ref={(ref) => { this.passwordField = ref; }}
                secureTextEntry
                onChangeText={val => this.setState({ password: val })}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <DefaultButton
              bgColor={this.loginButtonIsDisabled ? 'grey' : Colors.actionYellow}
              textColor={Colors.white}
              text={I18n.t('Login')}
              disabled={this.loginButtonIsDisabled}
              onPress={this.loginRequest}
            />
          </Form>
        </LogoHeaderBackground>
      </KeyboardAwareScrollView>
    );
  }
}

const withRedux = connect(state => ({ user: state.user }), {
  setToken: userActions.setToken,
});

export default ReactTimeout(withRedux(LoginScreen));

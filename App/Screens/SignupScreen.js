import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LogoHeaderBackground from '../Backgrounds/LogoHeaderBackground';
import DefaultButton from '../Components/DefaultButton';
import Text from '../Components/Text';
import I18n from '../I18n/index';
import userActions, { STATUS } from '../Redux/UserRedux';
import api from '../Services/SeedorfApi';
import Colors from '../Themes/Colors';

export class _Signup extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigation: PropTypes.object,
    setToken: PropTypes.func,
    user: PropTypes.object,
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
      this.props.navigation.popToTop();
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

  render() {
    return (
      <KeyboardAwareScrollView>
        <LogoHeaderBackground>
          <Form>
            <FieldSet>
              <BlackText>{I18n.t('First name')}</BlackText>
              <Input
                onChangeText={val => this.setState({ first_name: val })}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <FieldSet>
              <BlackText>{I18n.t('Last name')}</BlackText>
              <Input
                onChangeText={val => this.setState({ last_name: val })}
                editable={!this.requestIsPending}
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
                keyboardType="email-address"
                onChangeText={val => this.setState({ email: val })}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <FieldSet>
              <BlackText>{I18n.t('Password')}</BlackText>
              {this.hasError &&
                'password1' in this.error && (
                  <Error>{I18n.t('Password needs to be at least 8 characters')}</Error>
                )}
              <Input
                secureTextEntry
                onChangeText={val => this.setState({ password: val })}
                editable={!this.requestIsPending}
              />
            </FieldSet>
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
export default Signup;

const FieldSet = styled.View`
  margin-top: 8px;
`;
const Error = styled(Text)`
  color: red;
`;
const Input = styled(TextInput)`
  color: black;
`;

const Form = styled.View`
  width: 100%;
  padding-horizontal: 16;
`;

const BlackText = styled(Text)`
  color: ${Colors.black};
`;

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'
import Colors from '../Themes/Colors'
import Text from '../Components/Text'
import I18n from '../I18n/index'
import DefaultButton from '../Components/DefaultButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import userActions, { STATUS } from '../Redux/UserRedux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import api from '../Services/SeedorfApi'
import LogoHeaderBackground from '../Backgrounds/LogoHeaderBackground'

export class _LoginScreen extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigation: PropTypes.object,
    setToken: PropTypes.func,
    user: PropTypes.object
  }

  constructor () {
    super()
    this.state = {
      requestStatus: STATUS.IDLE,
      error: null,
      email: '',
      password: ''
    }
  }

  loginRequest = async () => {
    this.setState({ requestStatus: STATUS.PENDING })
    const result = await api.login({
      username: this.state.email,
      email: this.state.email,
      password: this.state.password
    })
    if (result.problem) {
      console.log('problem')
      this.setState({
        requestStatus: STATUS.FAILURE,
        error: result.data
      })
    } else {
      this.props.setToken(result.data.token)
      this.props.navigation.goBack(null)
    }
  }

  componentWillMount () {
    if (this.props.user.uuid) {
      this.props.navigation.navigate('MainNav')
    }
  }

  get requestIsPending () {
    return this.state.requestStatus === STATUS.PENDING
  }

  get hasError () {
    return this.state.requestStatus === STATUS.FAILURE
  }

  get error () {
    return this.hasError ? this.state.error : null
  }

  get loginButtonIsDisabled () {
    return this.requestIsPending || !(this.state.email && this.state.password)
  }

  render () {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <LogoHeaderBackground>
          <Form>
            <FieldSet>
              <BlackText>{I18n.t('E-mail')}</BlackText>
              <Input
                onChangeText={val => this.setState({ email: val })}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <FieldSet>
              <BlackText>{I18n.t('Password')}</BlackText>
              {this.hasError && (
                <Error>{I18n.t('Wrong username or password')}</Error>
              )}
              <Input
                secureTextEntry
                onChangeText={val => this.setState({ password: val })}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <DefaultButton
              bgColor={
                this.loginButtonIsDisabled ? 'grey' : Colors.actionYellow
              }
              textColor={Colors.white}
              text={I18n.t('Login')}
              disabled={this.loginButtonIsDisabled}
              onPress={this.loginRequest}
            />
          </Form>
        </LogoHeaderBackground>
      </KeyboardAwareScrollView>
    )
  }
}

const LoginScreen = connect(state => ({ user: state.user }), {
  setToken: userActions.setToken
})(_LoginScreen)
export default LoginScreen

const FieldSet = styled.View`
  margin-top: 8px;
`
const Error = styled(Text)`
  color: red;
`
const Input = styled(TextInput)`
  color: black;
`

const Form = styled.View`
  width: 100%;
  padding-horizontal: 16;
`

const BlackText = styled(Text)`
  color: ${Colors.black};
`

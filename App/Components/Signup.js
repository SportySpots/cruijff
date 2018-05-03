import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TextInput, ScrollView } from 'react-native'
import Colors from '../Themes/Colors'
import Logo from './Logo'
import Text from './Text'
import I18n from '../I18n'
import DefaultButton from './DefaultButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import userActions, { STATUS } from '../Redux/UserRedux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import api from '../Services/SeedorfApi'

export class _Signup extends Component {
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
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

  signupRequest = async () => {
    this.setState({ requestStatus: STATUS.PENDING })
    const result = await api.signup({
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

  shouldComponentUpdate () {
    console.log('should update')
    return true
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

  get signupButtonIsDisabled () {
    return (
      this.requestIsPending ||
      !(
        this.state.first_name &&
        this.state.last_name &&
        this.state.email &&
        this.state.password
      )
    )
  }

  render () {
    console.log('rendering')
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <KeyboardAwareScrollView contentContainerStyle={style.container}>
          <View style={style.skew} />
          <View style={style.logoContainer}>
            <Logo scale={1} />
            <Text.L style={style.logoText}>SPORTYSPOTS</Text.L>
          </View>
          <View style={style.form}>
            <FieldSet>
              <Text style={style.text}>{I18n.t('First name')}</Text>
              <Input
                onChangeText={val => this.setState({ first_name: val })}
                style={style.input}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <FieldSet>
              <Text style={style.text}>{I18n.t('Last name')}</Text>
              <Input
                onChangeText={val => this.setState({ last_name: val })}
                style={style.input}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <FieldSet>
              <Text style={style.text}>{I18n.t('E-mail')}</Text>
              {this.hasError &&
                'email' in this.error && (
                  <Error>
                    {I18n.t(
                      'username' in this.error
                        ? 'E-mail address in use'
                        : 'Enter a valid e-mail address'
                    )}
                  </Error>
                )}
              <Input
                onChangeText={val => this.setState({ email: val })}
                style={style.input}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <FieldSet>
              <Text style={style.text}>{I18n.t('Password')}</Text>
              {this.hasError &&
                'password1' in this.error && (
                  <Error>
                    {I18n.t('Password needs to be at least 8 characters')}
                  </Error>
                )}
              <TextInput
                onChangeText={val => this.setState({ password: val })}
                style={style.input}
                editable={!this.requestIsPending}
              />
            </FieldSet>
            <DefaultButton
              bgColor={
                this.signupButtonIsDisabled ? 'grey' : Colors.actionYellow
              }
              textColor={Colors.white}
              text={I18n.t('Signup')}
              disabled={this.signupButtonIsDisabled}
              onPress={this.signupRequest}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const Signup = connect(state => ({ user: state.user }), {
  setToken: userActions.setToken
})(_Signup)
export default Signup

const FieldSet = styled.View`
  margin-top: 8px;
`
const Error = styled(Text)`
  color: red;
`
const Input = styled(TextInput)`
  color: black;
`

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skew: {
    position: 'absolute',
    height: 100,
    width: 1000,
    left: -500,
    top: 0,
    backgroundColor: Colors.secondaryDarkBlueGreen,
    transform: [{ rotate: '-10deg' }]
  },
  logoContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    marginTop: 8,
    color: Colors.black
  },
  form: {
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 16
  },
  text: {
    color: Colors.black
  }
})

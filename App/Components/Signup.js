import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TextInput, ScrollView } from 'react-native'
import Colors from '../Themes/Colors'
import Logo from './Logo'
import Text from './Text'
import I18n from '../I18n'
import DefaultButton from './DefaultButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { STATUS } from '../Redux/UserRedux'
import styled from 'styled-components'

export default class Signup extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigation: PropTypes.object,
    signupRequest: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  componentWillMount () {
    console.log('signup will mount')
    if (this.props.user.signup.status === STATUS.SUCCESS) {
      this.props.navigation.navigate('OnboardingScreen')
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.user.signup.status === STATUS.SUCCESS) {
      this.props.navigation.navigate('OnboardingScreen')
    }
  }

  render () {
    const requestIsPending = this.props.user.signup.status === STATUS.PENDING
    const hasError = this.props.user.signup.status === STATUS.FAILURE
    const error = hasError ? this.props.user.signup.data : null
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <KeyboardAwareScrollView contentContainerStyle={style.container}>
          <View style={style.skew} />
          <View style={style.logoContainer}>
            <Logo scale={1} />
            <Text.L style={style.logoText}>SPORTYSPOTS</Text.L>
          </View>
          <View style={style.form}>
            <View style={style.fieldSet}>
              <Text style={style.text}>{I18n.t('Username')}</Text>
              {hasError &&
                'username' in error && (
                  <Error>{I18n.t('Username exists')}</Error>
                )}
              <TextInput
                onChangeText={val => this.setState({ username: val })}
                style={style.input}
                editable={!requestIsPending}
              />
            </View>
            <View style={style.fieldSet}>
              <Text style={style.text}>{I18n.t('E-mail')}</Text>
              {hasError &&
                'email' in error && (
                  <Error>{I18n.t('Enter a valid e-mail address')}</Error>
                )}
              <TextInput
                onChangeText={val => this.setState({ email: val })}
                style={style.input}
                editable={!requestIsPending}
              />
            </View>
            <View style={style.fieldSet}>
              <Text style={style.text}>{I18n.t('Password')}</Text>
              {hasError &&
                'password1' in error && (
                  <Error>
                    {I18n.t('Password needs to be at least 8 characters')}
                  </Error>
                )}
              <TextInput
                onChangeText={val => this.setState({ password: val })}
                style={style.input}
                editable={!requestIsPending}
              />
            </View>
            <DefaultButton
              bgColor={requestIsPending ? 'gray' : 'blue'}
              textColor={Colors.white}
              text={I18n.t('Signup')}
              onPress={() =>
                this.props.signupRequest({
                  username: this.state.username,
                  email: this.state.email,
                  password: this.state.password
                })
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skew: {
    position: 'absolute',
    height: 130,
    width: 1000,
    left: -500,
    top: 0,
    backgroundColor: Colors.secondaryDarkBlueGreen,
    transform: [{ rotate: '-10deg' }]
  },
  logoContainer: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    marginTop: 32,
    color: Colors.black
  },
  form: {
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 16
  },
  fieldSet: {
    marginTop: 16
  },
  text: {
    color: Colors.black
  },
  input: {
    color: Colors.black
  }
})

const Error = styled(Text)`
  color: red;
`

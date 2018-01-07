import { Text, View } from 'react-native'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'

import Logo from '../../Components/Logo'
import styles from './Styles/Splash'

import propTypes from 'prop-types'
import Permissions from 'react-native-permissions'

class SplashScreen extends React.Component {
  constructor () {
    super()
    this.state = { locationAccess: 'pending' }
  }

  // eslint-disable-next-line no-undef
  loginWithFacebook = () => {
    console.log(this)
    Permissions.check('location').then(this.setState({locationAccess: 'granted'})).catch(this.setState({locationAccess: 'denied'}))
    console.log(Permissions.request('location').then(console.log).catch(console.log))
    // console.log(navigator.geolocation.getCurrentPosition(console.log, console.log,
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }))
    // TODO: add FB integration
    // this.props.navigation.navigate('FindSpotScreen')
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={styles.title}>{I18n.t('Sporty Spots')}</Text>

          <Icon.Button name='facebook' backgroundColor='#3b5998' onPress={this.loginWithFacebook}>
            {I18n.t('Login with Facebook')}
          </Icon.Button>
          <Text>{this.state.locationAccess}</Text>
        </View>
      </View>
    )
  }
}

SplashScreen.propTypes = {
  navigation: propTypes.object.isRequired
}

export default SplashScreen

// login -> ok/fail ->

import { Text, View } from 'react-native'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { Component } from 'react'

import Logo from '../../Components/Logo'
import styles from './Styles/Splash'

export default class SplashScreen extends Component {
  loginWithFacebook = async() => {
    // TODO: add FB integration
    // Facebook.logInWithReadPermissionsAsync('402530240145015', {
    //   permissions: ['public_profile']
    // })
    this.props.navigation.navigate('FindSpotScreen')
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
          <Text style={styles.title}>SOCCERSPOTS</Text>

          <Icon.Button name='facebook' backgroundColor='#3b5998' onPress={this.loginWithFacebook}>
            {I18n.t('Login with Facebook')}
          </Icon.Button>
        </View>
      </View>
    )
  }
}

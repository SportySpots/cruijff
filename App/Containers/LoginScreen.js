import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

import Logo from '../Components//Logo';

// Styles
import styles from './Styles/LoginScreenStyles'

export default class LoginScreen extends Component {
  onFacebookLogin = async() => {
    // TODO: add FB integration
    // Facebook.logInWithReadPermissionsAsync('402530240145015', {
    //   permissions: ['public_profile']
    // })
    this.props.navigation.navigate('SearchScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo}/>
          <Text style={styles.title}>SOCCERSPOTS</Text>
        </View>
        <View style={styles.formContainer}>
          <Button onPress={this.onFacebookLogin} title="Facebook login">Facebook login</Button>
        </View>
      </View>
    );
  }
}

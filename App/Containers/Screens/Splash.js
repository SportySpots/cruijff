import { Text, View } from 'react-native'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'

import Logo from '../../Components/Logo'
import styles from './Styles/Splash'

import propTypes from 'prop-types'
import { connect } from 'react-redux'

import locationAction from '../../Redux/LocationRedux'

class SplashScreen extends React.Component {
  // eslint-disable-next-line no-undef
  loginWithFacebook = () => {
    this.props.getLocation();
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
        </View>
      </View>
    )
  }
}

SplashScreen.propTypes = {
  navigation: propTypes.object.isRequired,
  getLocation: propTypes.func
}

const dispatchToProps = (dispatch) => ({
  getLocation: () => dispatch(locationAction.getLocation())
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, dispatchToProps)(SplashScreen)

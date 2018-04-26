import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import FieldBackground from './FieldBackground'
import Logo from './Logo'
import Text from './Text'
import PropTypes from 'prop-types'
import DefaultButton from './DefaultButton'
import I18n from '../I18n'
import Colors from '../Themes/Colors'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
// import { ApplicationStyles, Metrics } from '../Themes'

class _SplashScreen extends Component {
  static propTypes = {
    navigation: PropTypes.any
  }

  render () {
    const { navigate } = this.props.navigation

    return (
      <FieldBackground>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.textContainer}>
          <SplashLabel>
            Ontdek sportlocaties en activiteiten bij jou in de buurt
          </SplashLabel>
        </View>
        {this.props.user.initialized ? (
          <View style={styles.buttonsContainer}>
            <DefaultButton
              onPress={() => navigate('MainNav')}
              text={I18n.t('Start discovering')}
              bgColor={Colors.actionYellow}
              textColor='white'
            />
            <TouchableOpacity onPress={() => navigate('SignupScreen')}>
              <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <ActivityIndicator size='large' color='#00ff00' />
          </View>
        )}
      </FieldBackground>
    )
  }
}

const SplashScreen = connect(state => ({ user: state.user }))(_SplashScreen)
export default SplashScreen

const styles = StyleSheet.create({
  logo: {
    height: 80,
    width: 80
  },
  logoContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  skipActionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50
  }
})

const SplashLabel = styled(Text.L)`
  color: ${props => props.textColor || '#fff'}
  text-align: center;
  `

const LinkLabel = styled(Text.M)`
  color: ${props => props.textColor || '#fff'}
  text-align: center;
  text-decoration-line: underline;
`

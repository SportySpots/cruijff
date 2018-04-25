import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
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
// import { ApplicationStyles, Metrics } from '../Themes'

export default class SplashScreen extends Component {
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
        <View style={styles.buttonsContainer}>
          <DefaultButton
            onPress={() => navigate('SignupScreen')}
            text={I18n.t('Start discovering')}
            bgColor={Colors.actionYellow}
            textColor='white'
          />
          <TouchableOpacity onPress={() => navigate('SpotSearchTab')}>
            <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
          </TouchableOpacity>
        </View>
      </FieldBackground>
    )
  }
}

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

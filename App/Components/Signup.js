import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TextInput, ScrollView } from 'react-native'
import Colors from '../Themes/Colors'
import Logo from './Logo'
import Text from './Text'
import I18n from '../I18n'
import DefaultButton from './DefaultButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Signup extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigation: PropTypes.object
  }

  render () {
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
              <Text style={style.text}>{I18n.t('First name')}</Text>
              <TextInput style={style.input} defaultValue='' />
            </View>
            <View style={style.fieldSet}>
              <Text style={style.text}>{I18n.t('Last name')}</Text>
              <TextInput style={style.input} defaultValue='' />
            </View>
            <View style={style.fieldSet}>
              <Text style={style.text}>{I18n.t('E-mail address')}</Text>
              <TextInput style={style.input} defaultValue='' />
            </View>
            <DefaultButton
              bgColor={'blue'}
              textColor={Colors.white}
              text={I18n.t('Signup')}
              onPress={() => this.props.navigation.navigate('OnboardingScreen')}
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

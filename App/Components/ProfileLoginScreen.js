import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import BasicButton from '../Components/BasicButton'
import I18n from '../I18n'
import Text from './Text'
import images from '../Themes/Images'
export default class ProfileLoginScreen extends Component {
  render () {
    return (
      <View style={style.container}>
        <Image source={images.createProfileAvatar} />
        <View style={{ height: 32 }} />
        <Text.L>{I18n.t('Play sports')}!</Text.L>
        <View style={{ height: 32 }} />
        <Text.M>{I18n.t('explain-login')}</Text.M>

        <BasicButton
          onPress={() => this.props.facebookLogin()}
          text='Login using Facebook'
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

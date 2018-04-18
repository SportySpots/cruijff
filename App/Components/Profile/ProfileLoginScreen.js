import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import DefaultButton from '../DefaultButton'
import I18n from '../../I18n/index'
import Text from '../Text'
import images from '../../Themes/Images'
import styled from 'styled-components/native'

export default class ProfileLoginScreen extends Component {
  render () {
    return (
      <View style={style.maincontainer}>
        <View style={style.container}>
          <Image source={images.createProfileAvatar} />
          <View style={{ height: 32 }} />
          <Text.L>{I18n.t('Meld je aan')}!</Text.L>
          <View style={{ height: 32 }} />
          <Text.M>{I18n.t('Meld je aan en start met sporten')}</Text.M>
        </View>
        <ButtonContainer>
          <DefaultButton onPress={() => null} text='Registreer' />
        </ButtonContainer>
      </View>
    )
  }
}

const style = StyleSheet.create({
  maincontainer: {
    flex: 1
  },
  container: {
    flex: 8,
    alignItems: 'center'
  }
})

const ButtonContainer = styled.View`
  flex: 7;
`

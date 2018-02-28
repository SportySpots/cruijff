import React, { Component } from 'react'
import { View, Text } from 'react-native'
import BasicButton from '../Components/BasicButton'

export default class ProfileLoginScreen extends Component {
  render () {
    return (
      <View>
        <BasicButton
          onPress={() => this.props.facebookLogin()}
          text='Login using Facebook'
        />
      </View>
    )
  }
}

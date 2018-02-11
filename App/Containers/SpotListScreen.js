import React, { Component } from 'react'
import { View, Text } from 'react-native'

// TODO: Implement blank screen if no spots were found

export default class SpotListScreen extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Text>Spots List Screen</Text>
      </View>
    )
  }
}

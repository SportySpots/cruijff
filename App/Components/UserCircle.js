import React from 'react'
import Colors from '../Themes/Colors'
import { View, StyleSheet } from 'react-native'
import Text from './Text'

const userToInitials = user => {
  const splitName = user.name.split(' ')
  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0]
  } else {
    return user.name.substr(0, 1)
  }
}

export default ({ user }) => (
  <View style={style.circle}>
    <Text.M style={style.text}>{userToInitials(user)}</Text.M>
  </View>
)

const style = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.primaryGreen,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.white,
    padding: 4,
    textAlign: 'center'
  }
})

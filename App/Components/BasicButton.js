import React from 'react'
import Colors from '../Themes/Colors'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './Text'

const BasicButton = props => {
  const { text, ...otherProps } = props
  return (
    <TouchableOpacity {...otherProps}>
      <View style={[basicButtonStyle.button, { borderColor: props.color }]}>
        <Text style={{ color: props.color }}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BasicButton

const basicButtonStyle = StyleSheet.create({
  button: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.black,
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignItems: 'center'
  }
})

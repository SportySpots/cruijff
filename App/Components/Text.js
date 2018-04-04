/* Styled Text components */

import React from 'react'
import { StyleSheet, Text as NativeText } from 'react-native'
import Colors from '../Themes/Colors'
import Fonts from '../Themes/Fonts'

const Text = props => <NativeText {...props} />

const sizes = ['S', 'SM', 'M', 'L']

const styles = StyleSheet.create(
  sizes.reduce((acc, cur) => {
    acc[cur] = {
      ...Fonts.style[cur],
      color: Colors.black,
      lineHeight: Fonts.style[cur] * 1.5
    }
    return acc
  }, {})
)

sizes.map(size => {
  Text[size] = props => {
    const { style, ...otherProps } = props
    return <Text style={[styles[size], style]} {...otherProps} />
  }
})

export default Text

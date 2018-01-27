import React from 'react'
import {Text, StyleSheet, TouchableHighlight} from 'react-native'
import PropTypes from 'prop-types'
import Fonts from '../../Themes/Fonts'
import Colors from '../../Themes/Colors'

export default class extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.any,
    onPress: PropTypes.func
  }
  render () {
    const { text, ...props } = this.props
    return (
      <TouchableHighlight {...props}>
        <Text style={style.text}>
          {text.toUpperCase()} &gt;
        </Text>
      </TouchableHighlight>
    )
  }
}

const style = StyleSheet.create({
  text: {
    ...Fonts.style.M,
    lineHeight: Fonts.style.M.fontSize,
    color: Colors.white
  }
})

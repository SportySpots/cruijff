import React from 'react'
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native'
import PropTypes from 'prop-types'
import Fonts from '../../Themes/Fonts'
import Colors from '../../Themes/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
        <View style={style.button}>
          <View style={style.textContainer}>
            <Text style={style.text}>{text.toUpperCase()}</Text>
          </View>
          <Icon name='chevron-right' size={24} color='white' />
        </View>
      </TouchableHighlight>
    )
  }
}

const style = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    ...Fonts.style.M,
    textAlignVertical: 'center',
    lineHeight: 24,
    alignItems: 'baseline',
    color: Colors.white,
    textAlign: 'center'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

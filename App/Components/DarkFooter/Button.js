import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Text from '../Text'
import Colors from '../../Themes/Colors'

export default class extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.any,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    isBack: PropTypes.bool
  }

  render () {
    const { text, ...props } = this.props

    const WrapperElement = props.disabled ? View : TouchableOpacity

    return (
      <WrapperElement {...props}>
        <View style={style.button}>
          {this.props.isBack && (
            <Icon
              name='chevron-left'
              size={24}
              color={props.disabled ? Colors.gray : Colors.white}
            />
          )}
          <View style={style.textContainer}>
            <Text.M
              style={[style.text, props.disabled && { color: Colors.gray }]}
            >
              {text.toUpperCase()}
            </Text.M>
          </View>
          {!this.props.isBack && (
            <Icon
              name='chevron-right'
              size={24}
              color={props.disabled ? Colors.gray : Colors.white}
            />
          )}
        </View>
      </WrapperElement>
    )
  }
}

const style = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
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

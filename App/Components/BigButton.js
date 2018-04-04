import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Text from './Text'

// import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default class BigButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    bgColor: PropTypes.any,
    textColor: PropTypes.any,
    disabled: PropTypes.bool,
    text: PropTypes.string
  }

  onPress = () => {
    this.props.onPress && this.props.onPress()
  }

  render () {
    const styles = makeStyles(this.props)
    const {
      style,
      text,
      bgColor,
      textColor,
      disabled,
      ...otherProps
    } = this.props
    const Wrapper = disabled ? View : TouchableOpacity
    return (
      <Wrapper style={[styles.container, style]} {...otherProps}>
        <Text.M style={styles.text}>{text}</Text.M>
      </Wrapper>
    )
  }
}

const makeStyles = ({ bgColor, textColor }) => ({
  container: {
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 32,
    height: 48
  },
  text: {
    color: textColor
  }
})

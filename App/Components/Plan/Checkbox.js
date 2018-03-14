import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onPress: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.any
  }

  onPress = () => {
    this.props.onPress && this.props.onPress()
  }

  render () {
    const styles = makeStyles(this.props)
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View style={styles.innerBox} />
        <View style={styles.iconContainer}>
          {this.props.checked && (
            <Icon
              size={this.props.size}
              color={this.props.color}
              name='check'
            />
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

const makeStyles = ({ size, color }) => ({
  container: {
    width: size,
    height: size,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  innerBox: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: 0,
    marginRight: size / 2,
    marginTop: size / 4,
    marginBottom: size / 4,
    borderWidth: 1,
    borderRadius: size / 32,
    borderColor: color
  },
  iconContainer: {
    left: -size / 8,
    top: -size / 8
  }
})

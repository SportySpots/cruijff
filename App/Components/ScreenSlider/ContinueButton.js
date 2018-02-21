import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Text from '../Text'
import { buttonStyle as style } from './Styles'

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
            <Text.M style={style.text}>{text.toUpperCase()}</Text.M>
          </View>
          <Icon name='chevron-right' size={24} color='white' />
        </View>
      </TouchableHighlight>
    )
  }
}

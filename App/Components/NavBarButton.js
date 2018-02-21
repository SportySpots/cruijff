import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Text from './Text'
import Colors from '../Themes/Colors'

export default class NavBarButton extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    icon: PropTypes.shape({
      set: PropTypes.any,
      name: PropTypes.string
    }),
    onPress: PropTypes.func,
    main: PropTypes.bool
  }

  static defaultProps = {
    main: false
  }

  onPress = () => {
    this.props.onPress && this.props.onPress()
  }

  render () {
    const Icon = this.props.icon.set
    const color = this.props.main
      ? Colors.white
      : this.props.active ? Colors.primaryGreen : Colors.black54
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={this.onPress}>
        <View
          style={[
            navbarButtonStyle.button,
            this.props.main && navbarButtonStyle.mainButton
          ]}
        >
          <Icon name={this.props.icon.name} size={25} color={color} />
          <Text style={{ color: color }}>{this.props.buttonText}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const navbarButtonStyle = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainButton: {
    backgroundColor: Colors.primaryGreen,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})

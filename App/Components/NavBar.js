import React from 'react'
import I18n from '../I18n'
import { View, Keyboard, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import NavBarButton from './NavBarButton'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCummunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../Themes/Colors'

import api from '../Services/SeedorfApi'
import { connect } from 'react-redux'

const buttons = [
  {
    buttonText: 'find',
    navigate: 'SpotSearchTab',
    icon: {
      set: MaterialIcon,
      name: 'search'
    }
  },
  {
    buttonText: 'join',
    navigate: 'GameSearchTab',
    icon: {
      set: MaterialIcon,
      name: 'person-add'
    }
  },
  {
    buttonText: 'plan-a-game',
    onPress: async function () {
      // called with this = NavBar component
      const result = await api.createGame({
        name: this.props.user.claims.username + "'s game"
      })
      if (result.ok) {
        this.props.navigation.navigate('PlanScreen', {
          uuid: result.data.uuid
        })
      }
    },
    icon: {
      set: MaterialCummunityIcon,
      name: 'calendar-plus'
    },
    main: true
  },
  {
    buttonText: 'profile',
    navigate: 'ProfileTab',
    icon: {
      set: MaterialIcon,
      name: 'account-circle'
    }
  },
  {
    buttonText: 'settings',
    navigate: 'SettingsTab',
    icon: {
      set: MaterialIcon,
      name: 'settings'
    }
  }
]

export class _NavBar extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string,
    navigation: PropTypes.any, // react-navigation object
    user: PropTypes.object
  }

  static defaultProps = {}

  constructor () {
    super()
    this.state = { keyboardActive: false }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    )
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardActive: true })
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardActive: false })
  }

  onButtonPress = button => {
    if (button.onPress) {
      button.onPress.call(this)
    } else {
      this.props.navigation.navigate({ routeName: button.navigate })
    }
  }

  render () {
    if (this.state.keyboardActive) {
      return null
    }
    return (
      <View style={navbarStyle.container}>
        {buttons.map((button, index) => (
          <View
            key={index}
            style={
              button.main
                ? navbarStyle.mainButtonContainer
                : navbarStyle.buttonContainer
            }
          >
            <NavBarButton
              onPress={() => this.onButtonPress(button)}
              icon={button.icon}
              buttonText={I18n.t(button.buttonText)}
              active={
                this.props.navigation &&
                this.props.navigation.state.index === index
              }
              main={!!button.main}
            />
          </View>
        ))}
      </View>
    )
  }
}

const NavBar = connect(state => ({ user: state.user }))(_NavBar)
export default NavBar

const navbarStyle = StyleSheet.create({
  container: {
    height: 56,
    marginTop: -8,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.transparent
  },
  buttonContainer: {
    flex: 9,
    height: 48
  },
  mainButtonContainer: {
    flex: 11,
    height: 56,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})

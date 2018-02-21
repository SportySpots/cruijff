import React from 'react'
import I18n from '../I18n'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { navbarStyle } from './Styles/NavBar'
import NavBarButton from './NavBarButton'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCummunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

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
    navigate: 'GameJoinTab',
    icon: {
      set: MaterialIcon,
      name: 'person-add'
    }
  },
  {
    buttonText: 'plan-a-game',
    navigate: 'GamePlanTab',
    icon: {
      set: MaterialCummunityIcon,
      name: 'soccer'
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

export default class NavBar extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string,
    navigation: PropTypes.any // react-navigation object
  }

  static defaultProps = {}

  render () {
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
              onPress={() => this.props.navigation.navigate(button.navigate)}
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

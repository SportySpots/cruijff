import * as React from 'react'
import GamePlanScreen from './GamePlanScreen'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Text, View } from 'react-native'

const Nav = StackNavigator(
  {
    sportTime: {
      screen: GamePlanScreen,
      navigationOptions: {
        title: 'sportTime'
      }
    },
    pickSpot: {
      screen: () => (
        <View style={{ flex: 1 }}>
          <Text>bla</Text>
        </View>
      ),
      navigationOptions: {
        title: 'Join Game'
      }
    }
  },
  {
    tabBarComponent: () => null,
    animationEnabled: true
  }
)

export default class extends React.PureComponent {
  render () {
    return <Nav />
  }
}

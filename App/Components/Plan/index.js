import * as React from 'react'
import SportAndTime from './SportAndTime'
import PickSpot from './PickSpot'
import { StackNavigator } from 'react-navigation'

const Nav = StackNavigator(
  {
    sportTime: {
      screen: SportAndTime,
      navigationOptions: {
        title: 'sportTime'
      }
    },
    pickSpot: {
      screen: PickSpot,
      navigationOptions: {
        title: 'Pick a spot'
      }
    }
  },
  {
    tabBarComponent: () => null,
    animationEnabled: true,
    headerMode: 'none'
  }
)

export default class extends React.PureComponent {
  render () {
    return <Nav />
  }
}

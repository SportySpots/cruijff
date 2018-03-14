import * as React from 'react'
import SportAndTime from './SportAndTime'
import PickSpot from './PickSpot'
import { StackNavigator } from 'react-navigation'
import planWrapper from '../../Containers/Plan/planWrapper'
import Description from './Description'
import Created from './Created'

const Nav = StackNavigator(
  {
    sportTime: {
      screen: planWrapper(SportAndTime)
    },
    pickSpot: {
      screen: planWrapper(PickSpot)
    },
    description: {
      screen: planWrapper(Description)
    },
    created: {
      screen: planWrapper(Created)
    }
  },
  {
    tabBarComponent: () => null,
    animationEnabled: true,
    headerMode: 'none',
    initialRouteName: 'sportTime'
  }
)

export default planWrapper(
  class extends React.PureComponent {
    componentDidMount () {
      // console.log('mounted', this.props)
    }
    render () {
      return <Nav />
    }
  }
)

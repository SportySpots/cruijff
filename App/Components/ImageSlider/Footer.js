import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View} from 'react-native'
import NavDots from '../NavDots'
import Colors from '../../Themes/Colors'

export default class Footer extends React.PureComponent {
  static propTypes = {
    screenIndex: PropTypes.number,
    count: PropTypes.number
  }

  render () {
    return (
      <View style={style.outerContainer}>
        <NavDots
          count={this.props.count}
          active={this.props.screenIndex}
          theme={navDotsTheme}
          style={style.navDots}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  outerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  navDots: {
    marginBottom: 8,
    alignItems: 'center'
  }
})

const navDotsTheme = StyleSheet.create({
  circle: {
    backgroundColor: Colors.white,
    width: 4,
    height: 4,
    marginLeft: 2,
    marginRight: 2
  },
  active: {
    backgroundColor: Colors.white,
    width: 8,
    height: 8
  }
})

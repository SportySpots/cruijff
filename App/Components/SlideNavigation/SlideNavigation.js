import React from 'react'

import { View, StyleSheet } from 'react-native'
import Footer from './Footer'
import { TabNavigator } from 'react-navigation'
import PropTypes from 'prop-types'

/* Convert screen array to object, navigator wants it like this:
 * const nav= TabNavigator({
 *   One: {
 *     screen: OnBoarding1
 *   },
 *   Two: {
 *     screen: OnBoarding2
 *   }
 * }, {
 *   tabBarComponent: Footer,
 *   tabBarPosition: 'bottom'
 * })
 */
const arrayToObject = array =>
  array.reduce((obj, item, idx) => {
    obj[idx] = { screen: item }
    return obj
  }, {})

export default class extends React.Component {
  static propTypes = {
    components: PropTypes.array,
    onDone: PropTypes.func
  }

  componentWillMount () {
    this.navigator = TabNavigator(arrayToObject(this.props.components), {
      tabBarComponent: props => (
        <Footer {...props} onDone={this.props.onDone} />
      ),
      tabBarPosition: 'bottom'
    })
  }

  render () {
    const Navigator = this.navigator
    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

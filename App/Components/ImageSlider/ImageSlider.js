import React from 'react'

import {View, StyleSheet, Image} from 'react-native'
import {TabNavigator} from 'react-navigation'
import PropTypes from 'prop-types'
import Footer from './Footer'

/* Wacky changelistener object to use as the TabBarComponent, because react-navigation
   by default has no callback... Its .parent is the ImageSlider
 */
class ChangeListener extends React.PureComponent {
  static propTypes = {
    parent: PropTypes.object,
    navigation: PropTypes.object
  }
  componentDidUpdate () {
    this.props.parent.setState({ screenIndex: this.props.navigation.state.index })
  }
  render () {
    return null
  }
}

const arrayToObject = (array) =>
  array.reduce((obj, item, idx) => {
    obj[idx] = { screen: () => <Image style={styles.image} source={{
      uri: item
    }} /> }
    return obj
  }, {})

class ImageSlider extends React.Component {
  static propTypes = {
    images: PropTypes.array,
    style: PropTypes.any
  }

  constructor () {
    super()
    this.state = { screenIndex: 0 }
  }

  componentWillMount () {
    this.navigator = TabNavigator(
      arrayToObject(this.props.images),
      {
        tabBarComponent: (props) => <ChangeListener parent={this} {...props} />,
        tabBarPosition: 'bottom'
      }
    )
  }

  render () {
    const Navigator = this.navigator
    return (
      <View style={[styles.container, this.props.style]}>
        <Navigator />
        <Footer
          count={this.props.images.length}
          screenIndex={this.state.screenIndex}
        />
      </View>
    )
  }
}

export default ImageSlider

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  image: {
    flex: 1
  }
})

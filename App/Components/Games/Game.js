/* Card component, this is the Card that is used in a list of many Cards */

import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Text from '../Text'
import Api from '../../Services/FixtureApi'

export default class extends Component {
  static propTypes = {
    id: PropTypes.number,
    style: PropTypes.number
  }

  componentDidMount () {
    const { data } = Api.getGame()
    this.setState({ isLoading: false, spots: data })
  }

  render () {
    return (
      <View style={[this.props.style]}>
        <Text>bladiebla</Text>
      </View>
    )
  }
}

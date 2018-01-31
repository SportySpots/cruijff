import * as React from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'
import { style } from './Styles/Rating'
import Text from './Text'

export default class Rating extends React.Component {
  static propTypes = {
    rating: PropTypes.number
  }
  render () {
    return (
      <View style={style.container}>
        { [1, 2, 3, 4, 5].map(i =>
          <View key={i} style={[style.circle, i <= this.props.rating && style.full]} />)
        }
        <Text.S>
          {this.props.rating.toFixed(1)}/5.0
        </Text.S>
      </View>
    )
  }
}

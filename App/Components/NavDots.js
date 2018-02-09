import * as React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { style, themes } from './Styles/NavDotsStyle'

const range = function (count) {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(i)
  }
  return result
}

export default class NavDots extends React.Component {
  static defaultProps = {
    theme: themes.light
  }
  static propTypes = {
    count: PropTypes.number,
    active: PropTypes.number,
    theme: PropTypes.object,
    style: PropTypes.number
  }
  render () {
    return (
      <View style={[style.outer, this.props.style]}>
        {range(this.props.count).map(i => (
          <View
            key={i}
            style={[
              style.circle,
              this.props.theme.circle,
              i === this.props.active && [style.active, this.props.theme.active]
            ]}
          />
        ))}
      </View>
    )
  }
}

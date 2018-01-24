import * as React from 'react'
import {View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

const range = function (count) {
  const result = []
  for (let i = 0; i < count; i++) { result.push(i) }
  return result
}

class NavDots extends React.Component {
  render () {
    const theme = themes[this.props.theme]

    return (
      <View style={style.outer}>
        {range(this.props.count).map(i =>
          <View
            key={i}
            style={[style.circle, theme.circle, i === this.props.active && [style.active, theme.active]]}
          />)}
      </View>
    )
  }
}

const style = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'row'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5
  },
  active: {}
})

const themes = {
  light: StyleSheet.create({
    circle: {
      backgroundColor: '#f00'
    },
    active: {
      backgroundColor: '#0f0'
    }
  })
}

NavDots.propTypes = {
  count: PropTypes.number,
  active: PropTypes.number,
  theme: PropTypes.oneOf(Object.keys(themes))
}

export default NavDots

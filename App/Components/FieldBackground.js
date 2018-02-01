import React from 'react'
import Svg, { Path } from 'react-native-svg'

import { View, Dimensions, StyleSheet } from 'react-native'

let fullWidth = Dimensions.get('window').width
let fullHeight = Dimensions.get('window').height

export default props => (
  <View style={styles.container}>
    <View style={styles.bgContainer}>
      <Svg width={fullWidth} height={fullHeight}>
        <Path
          d={`M${0.2 * fullWidth} 0 h ${0.05 * fullWidth} L ${0.15 *
            fullWidth} ${fullHeight} h ${-0.08 * fullWidth} Z`}
          fill='white'
        />
        <Path
          d={`M0 0 h ${fullWidth} v ${0.5 * fullHeight} L 0 ${2 /
            3 *
            fullHeight} Z`}
          fill='black'
          opacity='.6'
        />
      </Svg>
    </View>
    <View style={styles.childContainer}>{props.children}</View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    height: fullHeight
  },
  bgContainer: {
    backgroundColor: 'green',
    position: 'absolute',
    left: 0,
    top: 0
  },
  childContainer: {
    width: fullWidth,
    height: fullHeight
  }
})

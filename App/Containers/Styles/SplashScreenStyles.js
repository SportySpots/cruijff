import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: Metrics.images.large,
    width: Metrics.images.large
  }
})

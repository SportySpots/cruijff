import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.large,
    width: Metrics.images.large
  },
  logoContainer: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  skipActionContainer: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 70
  },
  facebookActionContainer: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})

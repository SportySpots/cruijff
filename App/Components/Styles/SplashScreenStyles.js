import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.large,
    width: Metrics.images.large
  },
  logoContainer: {
    ...ApplicationStyles.screen.container,
    flex: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  skipActionContainer: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50
  }
})

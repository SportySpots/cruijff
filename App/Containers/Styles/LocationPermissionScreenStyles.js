import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.secondaryGreen
  },
  illustrationContainer: {
    ...ApplicationStyles.screen.container,
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  skipActionContainer: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 10
  },
  actionButtonContainer: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})

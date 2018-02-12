import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backgroundContainer: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.secondaryGreen
  },
  illustrationContainer: {
    ...ApplicationStyles.screen.container,
    flex: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  actionButtonContainer: {
    ...ApplicationStyles.screen.container,
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  skipActionContainer: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 70
  }
})

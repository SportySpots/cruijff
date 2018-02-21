import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    borderRadius: 100,
    borderWidth: 10,
    borderStyle: 'solid',
    elevation: 5
  },
  labelsContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  labels: {
    textAlign: 'left'
  }
})

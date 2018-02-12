import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    borderRadius: 100,
    borderWidth: 10,
    borderStyle: 'solid'
  },
  labelsContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  labels: {
    textAlign: 'left'
  },
  spotPropertiesContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  spotProperty: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rating: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})

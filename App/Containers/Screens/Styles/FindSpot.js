import { Dimensions, StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../../Themes/'

const height = Dimensions.get('window').height;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  card: {
    height: height / 2.5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  addButtonContainer: {
    flex: 1,
    position: 'absolute',
    right: "5%",
    bottom: "2%"
  }
});

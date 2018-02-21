import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'
import Fonts from '../../Themes/Fonts'

export const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: Colors.black54
  },
  full: {
    backgroundColor: Colors.primaryGreen
  },
  text: {
    ...Fonts.style.S,
    marginLeft: 8,
    color: Colors.black
  }
})

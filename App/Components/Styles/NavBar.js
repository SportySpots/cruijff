import { StyleSheet } from 'react-native'
import Fonts from '../../Themes/Fonts'
import Colors from '../../Themes/Colors'

export const navbarStyle = StyleSheet.create({
  container: {
    height: 70,
    marginTop: -20,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.transparent
  },
  buttonContainer: {
    flex: 1,
    height: 50
  },
  mainButtonContainer: {
    flex: 2,
    height: 70,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})

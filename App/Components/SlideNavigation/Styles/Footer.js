import {StyleSheet} from 'react-native'
import Colors from '../../../Themes/Colors'
import Fonts from '../../../Themes/Fonts'

export const style = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'column',
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    ...Fonts.style.L
  },
  navDots: {
  },
  continueButton: {
    position: 'absolute',
    right: 5
  }
})

export const navDotsTheme = StyleSheet.create({
  circle: {
    backgroundColor: Colors.white20
  },
  active: {
    backgroundColor: Colors.actionYellow
  }
})

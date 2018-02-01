import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'
import Fonts from '../../../Themes/Fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    flex: 1,
    paddingRight: 50,
    paddingLeft: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    flex: 1
  },
  textContainer: {
    flex: 1
  },
  title: {
    ...Fonts.style.L,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: 48,
    marginBottom: 24
  },
  paragraph: {
    ...Fonts.style.M,
    lineHeight: Fonts.style.M.fontSize * 1.5,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: 50
  }
})

export const askLocation = StyleSheet.create({
  footer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  text: {
    ...Fonts.style.S,
    fontSize: 16,
    color: Colors.white
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  button: {
    ...Fonts.style.M,
    color: Colors.actionYellow,
    marginHorizontal: 10
  }
})

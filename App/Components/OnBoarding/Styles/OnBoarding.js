import {StyleSheet} from 'react-native'
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
    alignItems: 'stretch'
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
    marginHorizontal: 50,
    marginBottom: 50
  },
  paragraph: {
    ...Fonts.style.M,
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
    justifyContent: 'space-between'
  },
  text: {
    ...Fonts.style.M,
    color: Colors.white
  },
  continueButton: {
    position: 'absolute',
    right: 5
  }
})

import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGreen,
  },
  imageContainer: {
    flex: 1,
    paddingRight: 50,
    paddingLeft: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Fonts.style.L,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: 48,
    marginBottom: 24,
  },
  paragraph: {
    ...Fonts.style.M,
    lineHeight: Fonts.style.M.fontSize * 1.5,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: 50,
  },
});

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.facebook,
    justifyContent: 'center'
  },
  buttonText: {
    ...Fonts.style.normal,
    color: Colors.white,
    textAlign: 'center',
    marginVertical: Metrics.baseMargin
  }
})

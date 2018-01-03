import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#005A40'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Roboto-Bold',
    color: 'white',
    fontSize: 28,
    marginTop: 30,
    marginBottom: 30
  }
})

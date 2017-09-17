import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../../Themes/'

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
  logo: {
    width: 100,
    height: 100
  },
  title: {
    fontFamily: 'Rajdhani-Bold',
    color: 'white',
    fontSize: 28,
    marginTop: 30,
    marginBottom: 30,
  }
});

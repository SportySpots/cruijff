// Simple React Native specific changes

import '../I18n/I18n'
import Fonts from '../Themes/Fonts'
import { Text } from 'react-native'

// REF: https://stackoverflow.com/a/47925418
Text.defaultProps.style = { fontFamily: Fonts.type.base }

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true
}

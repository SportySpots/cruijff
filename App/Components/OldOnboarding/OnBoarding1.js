import React from 'react'
import { styles } from './Styles/Onboarding'
import { View, Text, Image } from 'react-native'
import Images from '../../Themes/Images'
import I18n from '../../I18n'

export default props => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        resizeMode='contain'
        source={Images.illustrationWizard1}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{I18n.t('hi-sport')}</Text>
      <Text style={styles.paragraph}>{I18n.t('onboarding-1')}</Text>
    </View>
  </View>
)

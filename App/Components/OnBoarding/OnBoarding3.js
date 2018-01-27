import React from 'react'
import { styles } from './Styles/OnBoarding'
import {View, Text, Image} from 'react-native'
import Images from '../../Themes/Images'
import I18n from '../../I18n'

export default props =>
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} resizeMode='contain' source={Images.illustrationWizard3} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{I18n.t('plan-a-game')}</Text>
      <Text style={styles.paragraph}>
        {I18n.t('onboarding-3')}
      </Text>
    </View>
  </View>

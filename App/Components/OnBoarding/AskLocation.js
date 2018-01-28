import React from 'react'
import { styles, askLocation as askLocationStyle } from './Styles/OnBoarding'
import {View, Text, Image, TouchableHighlight} from 'react-native'
import Images from '../../Themes/Images'
import I18n from '../../I18n'

export default props =>
  <View style={styles.container}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} resizeMode='contain' source={Images.illustrationShareLocation} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{I18n.t('share-your-location')}</Text>
        <Text style={styles.paragraph}>
          {I18n.t('onboarding-ask-location')}
        </Text>
      </View>
    </View>
    <View style={askLocationStyle.footer}>
      <View>
        <Text style={askLocationStyle.text}>{I18n.t('share-your-location')}</Text>
      </View>
      <View style={askLocationStyle.buttonsContainer}>
        <TouchableHighlight onPress={() => console.log('test')}>
          <Text style={askLocationStyle.button}>{I18n.t('cancel').toUpperCase()}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => console.log('test')}>
          <Text style={askLocationStyle.button}>{I18n.t('allow').toUpperCase()}</Text>
        </TouchableHighlight>
      </View>
    </View>
  </View>

import React from 'react'
import { styles } from './Styles/Onboarding'
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native'
import Images from '../Themes/Images'
import I18n from '../I18n'
import Colors from '../Themes/Colors'
import Fonts from '../Themes/Fonts'
import Text from './Text'

export default props => (
  <View style={styles.container}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode='contain'
          source={Images.illustrationShareLocation}
        />
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
        <Text style={askLocationStyle.text}>
          {I18n.t('share-your-location')}
        </Text>
      </View>
      <View style={askLocationStyle.buttonsContainer}>
        <TouchableHighlight onPress={() => console.log('test')}>
          <View>
            <Text style={askLocationStyle.button}>
              {I18n.t('cancel').toUpperCase()}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => props.onPress()}>
          <View>
            <Text.M style={askLocationStyle.button}>
              {I18n.t('allow').toUpperCase()}
            </Text.M>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  </View>
)

const askLocationStyle = StyleSheet.create({
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
    color: Colors.actionYellow,
    marginHorizontal: 10
  }
})

import React from 'react'
import Colors from '../../Themes/Colors'
import Fonts from '../../Themes/Fonts'
import { View, StyleSheet } from 'react-native'
import I18n from '../../I18n'
import PropertyCircle from './PropertyCircle'
import Text from '../Text'

export default ({properties}) =>
  <View style={style.container}>
    { Object.keys(properties).map((property) =>
      <View key={property} style={style.innerContainer}>
        <Text.M style={style.text}>{I18n.t(property)}</Text.M>
        <PropertyCircle text={I18n.t(properties[property])} />
      </View>
      ) }
  </View>

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8
  },
  innerContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  text: {
    ...Fonts.style.S,
    width: '50%',
    textAlign: 'right',
    marginRight: 16
  }
})

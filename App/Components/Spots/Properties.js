import React from 'react'
import Fonts from '../../Themes/Fonts'
import { View, StyleSheet } from 'react-native'
import I18n from '../../I18n'
import PropertyCircle from '../PropertyCircle'
import Text from '../Text'

const Properties = ({ properties }) => (
  <View style={style.container}>
    {properties.map(property => (
      <View key={property.attribute_name} style={style.innerContainer}>
        <Text.M style={style.text}>{I18n.t(property.attribute_name)}</Text.M>
        <PropertyCircle text={I18n.t(property.value)} />
      </View>
    ))}
  </View>
)

export default Properties

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

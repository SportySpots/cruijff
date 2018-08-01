import React from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from '../../I18n';
import Fonts from '../../Themes/Fonts';
import PropertyCircle from '../Common/PropertyCircle';
import Text from '../Common/Text';

const Amenities = ({ amenities }) =>
  console.log(amenities) || (
    <View style={style.container}>
      {Object.keys(amenities).map(key =>
          console.log(amenities[key]) || (
            <View key={key} style={style.innerContainer}>
              <Text.M style={style.text}>{I18n.t(key)}</Text.M>
              <PropertyCircle text={amenities[key]} />
            </View>
          ))}
    </View>
  );

export default Amenities;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  innerContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    ...Fonts.style.S,
    width: '50%',
    textAlign: 'right',
    marginRight: 16,
  },
});

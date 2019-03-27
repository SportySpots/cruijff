import React from 'react';
import I18n from '../../../I18n';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Amenities = ({ amenities }) => {
  const array = [];

  Object.keys(amenities).forEach((key) => {
    array.push([
      <Block key={key} midHeight>
        <Row>
          <Text size="M">{I18n.t(key)}</Text>
          <Text size="M" bold>{amenities[key]}</Text>
        </Row>
      </Block>,
      <Divider key={`${key}-divider`} />,
    ]);
  });

  return array;
};


export default Amenities;


/*
import React from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from '../../I18n';
import Fonts from '../../Themes/Fonts';
import Avatar from '../Common/Avatar';
import Text from '../Common/Text';

const Amenities = ({ amenities }) =>
  console.log(amenities) || (
    <View style={style.container}>
      {Object.keys(amenities).map(key =>
          console.log(amenities[key]) || (
            <View key={key} style={style.innerContainer}>
              <Text.M style={style.text}>{I18n.t(key)}</Text.M>
              <Avatar text={amenities[key]} />
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

*/
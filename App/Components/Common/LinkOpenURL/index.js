import React from 'react';
import PropTypes from 'prop-types';
import { Linking, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import Row from '../Row';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LinkOpenURL = ({
  text,
  href,
  color,
  iconSet,
  iconName,
  size,
  underline,
}) => {
  const TextSize = Text[size];
  const Icon = iconSet === 'MaterialIcon' ? MaterialIcon : MaterialCommunityIcon;

  return (
    <TouchableOpacity onPress={() => { Linking.openURL(href); }}>
      <Row
        justifyContent="space-between"
        alignItems="center"
      >
        <TextSize
          style={{
            color,
            textDecorationLine: underline ? 'underline' : 'none',
            textDecorationStyle: 'solid',
            textDecorationColor: color,
          }}
        >
          {text}
        </TextSize>
        {!!iconName && (
          <Icon
            name={iconName}
            size={24}
            color={Colors.black}
          />
        )}
      </Row>
    </TouchableOpacity>
  );
};

LinkOpenURL.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.string,
  iconSet: PropTypes.oneOf(['MaterialIcon', 'MaterialCommunityIcon']),
  iconName: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  underline: PropTypes.bool,
};

LinkOpenURL.defaultProps = {
  text: '',
  href: '',
  color: 'black',
  iconSet: 'MaterialIcon',
  iconName: '',
  size: 'M',
  underline: false,
};

export default LinkOpenURL;

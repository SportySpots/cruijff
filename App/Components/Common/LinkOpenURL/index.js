import React from 'react';
import PropTypes from 'prop-types';
import { Linking, TouchableOpacity } from 'react-native';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import Row from '../Row';
import Text from '../Text';
import Icon from '../Icon';

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
}) => (
  <TouchableOpacity onPress={() => { Linking.openURL(href); }}>
    <Row
      justifyContent="space-between"
      alignItems="center"
    >
      <Text
        size={size}
        color={color}
        underline={underline}
      >
        {text}
      </Text>
      {!!iconName && (
        <Icon
          iconSet={iconSet}
          iconName={iconName}
          size={24}
          color="black"
        />
      )}
    </Row>
  </TouchableOpacity>
);

LinkOpenURL.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(Colors)),
  iconSet: PropTypes.string,
  iconName: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts)),
  underline: PropTypes.bool,
};

LinkOpenURL.defaultProps = {
  text: '',
  href: '',
  color: 'black',
  iconSet: '',
  iconName: '',
  size: 'M',
  underline: false,
};

export default LinkOpenURL;

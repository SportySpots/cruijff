import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import Row from '../Row';
import Text from '../Text';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LinkNavigate = ({
  navigation,
  params,
  text,
  to,
  color,
  iconSet,
  iconName,
  size,
  underline,
}) => (
  <TouchableOpacity onPress={() => { navigation.navigate(to, params); }}>
    <Row
      justifyContent="space-between"
      alignItems="center"
    >
      <Text
        size={size}
        underline={underline}
        color={color}
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

LinkNavigate.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  params: PropTypes.object, // eslint-disable-line
  to: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(Colors)),
  iconSet: PropTypes.string,
  iconName: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts)),
  underline: PropTypes.bool,
};

LinkNavigate.defaultProps = {
  params: {},
  to: '',
  text: '',
  color: 'black',
  iconSet: '',
  iconName: '',
  size: 'M',
  underline: false,
};

export default LinkNavigate;

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import Row from '../Row';
import Text from '../Text';

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
}) => {
  const Icon = iconSet === 'MaterialIcon' ? MaterialIcon : MaterialCommunityIcon;

  return (
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
            name={iconName}
            size={24}
            color={Colors.black}
          />
        )}
      </Row>
    </TouchableOpacity>
  );
};

LinkNavigate.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  params: PropTypes.object, // eslint-disable-line
  to: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(Colors)),
  iconSet: PropTypes.oneOf(['MaterialIcon', 'MaterialCommunityIcon']),
  iconName: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts)),
  underline: PropTypes.bool,
};

LinkNavigate.defaultProps = {
  params: {},
  to: '',
  text: '',
  color: 'black',
  iconSet: 'MaterialIcon',
  iconName: '',
  size: 'M',
  underline: false,
};

export default LinkNavigate;

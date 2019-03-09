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
  text,
  to,
  color,
  iconSet,
  iconName,
  size,
  underline,
}) => {
  const TextSize = Text[size];
  const Icon = iconSet === 'MaterialIcon' ? MaterialIcon : MaterialCommunityIcon;

  console.log('LinkNavigate', navigation);
  return (
    <TouchableOpacity onPress={() => { navigation.navigate(to); }}>
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

LinkNavigate.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  to: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  iconSet: PropTypes.oneOf(['MaterialIcon', 'MaterialCommunityIcon']),
  iconName: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  underline: PropTypes.bool,
};

LinkNavigate.defaultProps = {
  to: '',
  text: '',
  color: 'black',
  iconSet: 'MaterialIcon',
  iconName: '',
  size: 'M',
  underline: false,
};

export default LinkNavigate;

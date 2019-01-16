import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import Row from '../Row';
import Text from '../Text';

// TODO: rename to LinkNavigate
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavigateLink = ({
  navigation,
  text,
  screen,
  color,
  iconSet,
  iconName,
  size,
  underline,
}) => {
  const TextSize = Text[size];
  const Icon = iconSet === 'MaterialIcon' ? MaterialIcon : MaterialCommunityIcon;

  return (
    <TouchableOpacity onPress={() => { navigation.navigate(screen); }}>
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

NavigateLink.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  screen: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  iconSet: PropTypes.oneOf(['MaterialIcon', 'MaterialCommunityIcon']),
  iconName: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  underline: PropTypes.bool,
};

NavigateLink.defaultProps = {
  screen: '',
  text: '',
  color: 'black',
  iconSet: 'MaterialIcon',
  iconName: '',
  size: 'M',
  underline: false,
};

export default withNavigation(NavigateLink);

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Button = styled(TouchableHighlight)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavBarButton = ({
  btnLabel,
  icon,
  active,
  onPress,
  ...otherProps
}) => {
  const baseColor = active ? 'primaryGreen' : 'black34';

  return (
    <Button
      onPress={onPress}
      activeOpacity={1}
      underlayColor={Colors.grass10}
      {...otherProps}
    >
      <Center>
        <Icon
          iconSet={icon.set}
          iconName={icon.name}
          size={24}
          color={baseColor}
        />
        <Text
          size="S"
          color={baseColor}
          semibold={active}
        >
          {btnLabel}
        </Text>
      </Center>
    </Button>
  );
};

NavBarButton.propTypes = {
  btnLabel: PropTypes.string,
  icon: PropTypes.shape({
    set: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool,
  main: PropTypes.bool,
  onPress: PropTypes.func,
};

NavBarButton.defaultProps = {
  btnLabel: '',
  active: false,
  main: false,
  onPress: () => {},
};

export default NavBarButton;

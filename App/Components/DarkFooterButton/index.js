import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Fonts from '../../Themes/Fonts';
import Colors from '../../Themes/Colors';
import Text from '../Common/Text';
import Row from '../Common/Row';
import Spacer from '../Common/Spacer';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Label = styled(Text.S)`
  color: ${({ disabled }) => (!disabled ? Colors.white : Colors.gray)}
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DarkFooterButton = ({
  text,
  disabled,
  isBack,
  ...rest
}) => {
  const WrapperElement = disabled ? View : TouchableOpacity;
  const iconSize = 1.5 * Fonts.style.M.fontSize;

  return (
    <WrapperElement {...rest}>
      <Row
        justifyContent="center"
        alignItems="center"
      >
        {isBack && [
          <Icon
            key="icon"
            name="chevron-left"
            size={iconSize}
            color={disabled ? Colors.gray : Colors.white}
          />,
          <Spacer
            key="spacer"
            orientation="row"
            size="S"
          />,
        ]}
        <Label disabled={disabled}>
          {text.toUpperCase()}
        </Label>
        {!isBack && [
          <Spacer
            key="spacer"
            orientation="row"
            size="S"
          />,
          <Icon
            key="icon"
            name="chevron-right"
            size={iconSize}
            color={disabled ? Colors.gray : Colors.white}
          />,
        ]}
      </Row>
    </WrapperElement>
  );
}

DarkFooterButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  isBack: PropTypes.bool,
  onPress: PropTypes.func,
  // Plus all native props from TouchableOpacity
};

DarkFooterButton.defaultProps = {
  text: '',
  disabled: false,
  isBack: false,
  onPress: () => {},
};

export default DarkFooterButton;

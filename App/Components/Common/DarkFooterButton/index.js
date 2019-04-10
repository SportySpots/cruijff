import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Fonts from '../../../Themes/Fonts';
import Text from '../Text';
import Row from '../Row';
import Spacer from '../Spacer';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class DarkFooterButton extends React.PureComponent {
  render() {
    const {
      text,
      disabled,
      isBack,
      ...rest
    } = this.props;

    const WrapperElement = disabled ? View : TouchableOpacity;
    const iconSize = 1.5 * Fonts.M.fontSize;

    return (
      <WrapperElement {...rest}>
        <Row
          justifyContent="center"
          alignItems="center"
        >
          {isBack && [
            <Icon
              key="icon"
              iconSet="MaterialIcons"
              iconName="chevron-left"
              size={iconSize}
              color={disabled ? 'gray' : 'white'}
            />,
            <Spacer key="spacer" row size="S" />,
          ]}
          <Text
            size="M"
            color={!disabled ? 'white' : 'gray'}
            center
          >
            {text.toUpperCase()}
          </Text>
          {!isBack && [
            <Spacer key="spacer" row size="S" />,
            <Icon
              key="icon"
              iconSet="MaterialIcons"
              iconName="chevron-right"
              size={iconSize}
              color={disabled ? 'gray' : 'white'}
            />,
          ]}
        </Row>
      </WrapperElement>
    );
  }
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

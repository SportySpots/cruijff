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
const Label = styled(Text.SM)`
  color: ${({ disabled }) => (!disabled ? Colors.white : Colors.gray)}
  text-align: center;
  font-weight: bold;
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
  const iconSize = 1.5 * Fonts.style.SM.fontSize;

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
          <Spacer orientation="row" size="S" />,
        ]}
        <Label disabled={disabled}>
          {text.toUpperCase()}
        </Label>
        {!isBack && [
          <Spacer orientation="row" size="S" />,
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

/* import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Themes/Colors';
import Text from '../Common/Text';

export default class Button extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.any,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    isBack: PropTypes.bool,
  };

  render() {
    const { text, ...props } = this.props;

    const WrapperElement = props.disabled ? View : TouchableOpacity;

    return (
      <WrapperElement {...props}>
        <View style={style.button}>
          {this.props.isBack && (
            <Icon
              name="chevron-left"
              size={24}
              color={props.disabled ? Colors.gray : Colors.white}
            />
          )}
          <View style={style.textContainer}>
            <Text.M style={[style.text, props.disabled && { color: Colors.gray }]}>
              {text.toUpperCase()}
            </Text.M>
          </View>
          {!this.props.isBack && (
            <Icon
              name="chevron-right"
              size={24}
              color={props.disabled ? Colors.gray : Colors.white}
            />
          )}
        </View>
      </WrapperElement>
    );
  }
}

const style = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    textAlignVertical: 'center',
    lineHeight: 24,
    alignItems: 'baseline',
    color: Colors.white,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
*/
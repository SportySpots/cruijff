import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const Title = styled(Text.L)`
  color: ${({ color }) => (color)};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const FormLayout = ({
  children,
  title,
  titleColor,
  bgColor,
  onClose,
}) => (
  <Block bgColor={bgColor} flex={1}>
    <Row
      justifyContent="space-between"
      alignItems="center"
    >
      <Title color={titleColor}>
        {title}
      </Title>
      <TouchableOpacity onPress={onClose}>
        <Icon
          name="close"
          size={Fonts.style.L.fontSize}
          color={bgColor === Colors.primaryGreen ? Colors.white : Colors.black}
        />
      </TouchableOpacity>
    </Row>
    {children}
  </Block>
);

FormLayout.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  bgColor: PropTypes.string,
  onClose: PropTypes.func,
};

FormLayout.defaultProps = {
  title: '',
  titleColor: Colors.white,
  bgColor: Colors.primaryGreen,
  onClose: () => {},
};

export default FormLayout;

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  padding: 32px 32px 0 32px;
  flex: 1; /* full height */
  background-color: ${({ bgColor }) => (bgColor)}
`;
//------------------------------------------------------------------------------
export const Title = styled(Text.L)`
  color: ${({ color }) => (color)};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const FormLayout = ({
  children,
  theme,
  title,
  closable,
  onLeave,
}) => {
  const isWhiteTheme = theme === 'white';

  return (
    <Container bgColor={isWhiteTheme ? Colors.primaryGreen : Colors.lightGray}>
      <Row
        justifyContent="space-between"
        alignItems="center"
      >
        <Title color={isWhiteTheme ? Colors.white : Colors.black}>
          {title}
        </Title>
        {closable && (
          <TouchableOpacity onPress={onLeave}>
            <Icon
              name="close"
              size={Fonts.style.L.fontSize}
              color={isWhiteTheme ? Colors.white : Colors.black}
            />
          </TouchableOpacity>
        )}
      </Row>
      {children}
    </Container>
  );
};

FormLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  theme: PropTypes.oneOf(['black', 'white']),
  title: PropTypes.string,
  closable: PropTypes.bool,
  onLeave: PropTypes.func,
};

FormLayout.defaultProps = {
  theme: 'black',
  title: '',
  closable: true,
  onLeave: () => {},
};

export default FormLayout;

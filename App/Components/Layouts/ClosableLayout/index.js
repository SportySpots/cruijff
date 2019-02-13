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
  padding: 32px 16px 0 16px;
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
const ClosableLayout = ({
  children,
  theme,
  title,
  closable,
  onClose,
}) => {
  const isWhiteTheme = theme === 'white';

  return (
    <Container bgColor={isWhiteTheme ? Colors.primaryGreen : Colors.silver}>
      <Row
        justifyContent="space-between"
        alignItems="center"
      >
        <Title color={isWhiteTheme ? Colors.white : Colors.black}>
          {title}
        </Title>
        {closable && (
          <TouchableOpacity onPress={onClose}>
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

ClosableLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  theme: PropTypes.oneOf(['black', 'white']),
  title: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

ClosableLayout.defaultProps = {
  theme: 'black',
  title: '',
  closable: true,
  onClose: () => {},
};

export default ClosableLayout;

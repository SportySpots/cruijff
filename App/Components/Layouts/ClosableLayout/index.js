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
  background-color: ${({ bgColor }) => (Colors[bgColor])}
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
    <Container bgColor={isWhiteTheme ? 'primaryGreen' : 'silver'}>
      <Row
        justifyContent="space-between"
        alignItems="center"
      >
        <Text size="L" color={isWhiteTheme ? 'white' : 'black'}>
          {title}
        </Text>
        {closable && (
          <TouchableOpacity onPress={onClose}>
            <Icon
              name="close"
              size={Fonts.L.fontSize}
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

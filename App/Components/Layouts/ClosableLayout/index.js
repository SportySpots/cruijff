import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Fonts from '../../../Themes/Fonts';
import Row from '../../Common/Row';
import Text from '../../Common/Text';
import Icon from '../../Common/Icon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  padding: 32px 16px 0 16px;
  flex: 1; /* full height */
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor]}
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
              iconSet="MaterialCommunityIcons"
              iconName="close"
              size={Fonts.L.fontSize}
              color={isWhiteTheme ? 'white' : 'black'}
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

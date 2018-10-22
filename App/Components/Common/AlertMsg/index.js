import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import Block from '../Block';
import Row from '../Row';
import Spacer from '../Spacer';
import getPalette from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledBlock = styled(Block)`
  border-radius: 4px;
`;
//------------------------------------------------------------------------------
const FullWidth = styled.View`
  flex: 1; /* full width */
`;
//------------------------------------------------------------------------------
// TODO: replace this with Text.M[color]
const Message = styled(Text.M)`
  color: ${({ color }) => (color)};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AlertMsg = ({ status, value }) => {
  const palette = getPalette(status);
  const { iconName, fontColor, bgColor } = palette;

  return (
    <StyledBlock bgColor={bgColor}>
      <Row>
        <Icon
          name={iconName}
          size={24}
          color={fontColor}
        />
        <Spacer row size="M" />
        <FullWidth>
          <Message color={fontColor}>
            {value}
          </Message>
        </FullWidth>
      </Row>
    </StyledBlock>
  );
};

AlertMsg.propTypes = {
  status: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  value: PropTypes.string,
};

AlertMsg.defaultProps = {
  value: '',
};

export default AlertMsg;

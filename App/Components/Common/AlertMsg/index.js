import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Text from '../Text';
import Block from '../Block';
import Icon from '../Icon';
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
const FlexOne = styled.View`
  flex: 1; /* full width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AlertMsg = ({ status, value }) => {
  const palette = getPalette(status);
  const { iconName, fontColor, bgColor } = palette; // string to be used Colors[string]

  return (
    <StyledBlock bgColor={bgColor}>
      <Row>
        <Icon
          iconSet="MaterialCommunityIcons"
          iconName={iconName}
          size={24}
          color={fontColor}
        />
        <Spacer row size="M" />
        <FlexOne>
          <Text size="M" color={fontColor}>
            {value}
          </Text>
        </FlexOne>
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

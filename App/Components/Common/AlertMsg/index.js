import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import getPalette from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${({ bgColor }) => (bgColor)};
  padding: 16px;
  border-radius: 4px;
`;
//------------------------------------------------------------------------------
const Left = styled.View`
  margin-right: 8px;
`;
//------------------------------------------------------------------------------
const Right = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Message = styled(Text.M)`
  color: ${({ color }) => (color)}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AlertMsg = ({ status, value }) => {
  const palette = getPalette(status);
  const { iconName, fontColor, bgColor } = palette;

  return (
    <Container bgColor={bgColor}>
      <Left>
        <Icon
          name={iconName}
          size={24}
          color={fontColor}
        />
      </Left>
      <Right>
        <Message color={fontColor}>
          {value}
        </Message>
      </Right>
    </Container>
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

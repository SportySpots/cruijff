import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Text from '../Text';
import Row from '../Row';
import getPalette from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor]};
  border: 1px solid ${({ theme, borderColor }) => theme.colors[borderColor]};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Tag = ({ status, value, reverse }) => {
  const palette = getPalette(status, reverse);
  const { fontColor, bgColor, borderColor } = palette; // string to be use Colors[string]

  return (
    <Row>
      <Container bgColor={bgColor} borderColor={borderColor}>
        <Text size="SM" color={fontColor}>
          {value}
        </Text>
      </Container>
    </Row>
  );
};

Tag.propTypes = {
  status: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  value: PropTypes.string,
  reverse: PropTypes.bool,
};

Tag.defaultProps = {
  value: '',
  reverse: false,
};

export default Tag;

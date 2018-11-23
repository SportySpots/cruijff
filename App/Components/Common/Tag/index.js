import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';
import Row from '../Row';
import getPalette from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ bgColor }) => (bgColor)};
  border: 1px solid ${({ borderColor }) => (borderColor)};
`;
//------------------------------------------------------------------------------
// TODO: replace this with Text.M[color]
const Message = styled(Text.SM)`
  color: ${({ color }) => (color)};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Tag = ({ status, value, reverse }) => {
  const palette = getPalette(status, reverse);
  const { fontColor, bgColor, borderColor } = palette;

  return (
    <Row>
      <Container bgColor={bgColor} borderColor={borderColor}>
        <Message color={fontColor}>
          {value}
        </Message>
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

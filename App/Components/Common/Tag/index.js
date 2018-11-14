import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
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
`;
//------------------------------------------------------------------------------
// TODO: replace this with Text.M[color]
const Message = styled(Text.SM)`
  color: ${Colors.white};
  font-weight: bold;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Tag = ({ status, value }) => {
  const palette = getPalette(status);
  const { bgColor } = palette;

  return (
    <Row>
      <Container bgColor={bgColor}>
        <Message>{value}</Message>
      </Container>
    </Row>
  );
};

Tag.propTypes = {
  status: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  value: PropTypes.string,
};

Tag.defaultProps = {
  value: '',
};

export default Tag;

import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Block = styled.View`
  padding: 16px;
  height: ${({ height }) => (height ? `${height}px` : 'auto')}
`;

Block.propTypes = {
  height: PropTypes.number,
};

Block.defaultProps = {
  height: null,
};

export default Block;

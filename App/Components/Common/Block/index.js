import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Block = styled.View`
  padding: 16px;
  height: ${({ height }) => (height ? `${height}px` : 'auto')}
  background-color: ${({ bgColor }) => (bgColor)}
  flex: ${({ flex }) => (flex)}
`;

Block.propTypes = {
  height: PropTypes.number,
  bgColor: PropTypes.string,
  flex: PropTypes.number,
};

Block.defaultProps = {
  height: null,
  bgColor: Colors.transparent,
  flex: 0,
};

export default Block;

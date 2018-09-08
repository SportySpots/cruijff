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
`;

Block.propTypes = {
  height: PropTypes.number,
  bgColor: PropTypes.string,
};

Block.defaultProps = {
  height: null,
  bgColor: Colors.transparent,
};

export default Block;

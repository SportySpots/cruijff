import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: color should be one of Colors
const Block = styled.View`
  padding: ${({ midHeight }) => (midHeight ? '8px 16px' : '16px')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')}
  background-color: ${({ bgColor }) => (bgColor)}
`;

Block.propTypes = {
  height: PropTypes.number,
  bgColor: PropTypes.string,
  midHeight: PropTypes.bool,
};

Block.defaultProps = {
  height: null,
  bgColor: Colors.transparent,
  midHeight: false,
};

export default Block;

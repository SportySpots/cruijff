import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Block = styled.View`
  padding: ${({ midHeight }) => (midHeight ? '8px 16px' : '16px')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')}
  background-color: ${({ bgColor }) => (Colors[bgColor])}
`;

Block.propTypes = {
  height: PropTypes.number,
  bgColor: PropTypes.oneOf(Object.keys(Colors)),
  midHeight: PropTypes.bool,
};

Block.defaultProps = {
  height: null,
  bgColor: 'transparent',
  midHeight: false,
};

export default Block;

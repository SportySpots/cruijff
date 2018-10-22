import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

const Divider = styled.View`
  border-bottom-width: ${({ row }) => (row ? 0 : 1)}px;
  border-bottom-color: ${({ row }) => (
    row ? Colors.transparent : Colors.lightGray
  )};
  border-right-width: ${({ row }) => (row ? 1 : 0)}px;
  border-right-color: ${({ row }) => (
    row ? Colors.lightGray : Colors.transparent
  )};
`;

Divider.propTypes = {
  row: PropTypes.bool,
};

Divider.defaultProps = {
  row: false,
};

export default Divider;

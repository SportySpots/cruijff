import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

const Divider = styled.View`
  border-bottom-width: ${({ orientation }) => (orientation === 'column' ? 1 : 0)}px;
  border-bottom-color: ${({ orientation }) => (
    orientation === 'column' ? Colors.lightGray : Colors.transparent
  )};
  border-right-width: ${({ orientation }) => (orientation === 'row' ? 1 : 0)}px;
  border-right-color: ${({ orientation }) => (
    orientation === 'row' ? Colors.lightGray : Colors.transparent
  )};
`;

Divider.propTypes = {
  orientation: PropTypes.oneOf(['row', 'column']),
};

Divider.defaultProps = {
  orientation: 'column',
};

export default Divider;

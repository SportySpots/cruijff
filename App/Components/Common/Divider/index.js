import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Divider = styled.View`
  border-bottom-width: ${({ row }) => (row ? 0 : 1)}px;
  border-bottom-color: ${({ theme, row }) => (
    row ? theme.colors.transparent : theme.colors.silver
  )};
  border-right-width: ${({ row }) => (row ? 1 : 0)}px;
  border-right-color: ${({ theme, row }) => (
    row ? theme.colors.silver : theme.colors.transparent
  )};
`;

Divider.propTypes = {
  row: PropTypes.bool,
};

Divider.defaultProps = {
  row: false,
};

export default Divider;

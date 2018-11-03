import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: ${(({ alignItems }) => (alignItems))};
  justify-content: ${(({ justifyContent }) => (justifyContent))};
  width: ${({ width }) => (width)}
`;

Row.propTypes = {
  alignItems: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
    'stretch',
  ]),
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  width: PropTypes.string,
};

Row.defaultProps = {
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  width: '100%',
};

export default Row;

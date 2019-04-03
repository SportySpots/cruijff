import PropTypes from 'prop-types';
import styled from 'styled-components/native';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: ${(({ alignItems }) => (alignItems))};
  justify-content: ${(({ justifyContent }) => (justifyContent))};
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
};

Row.defaultProps = {
  alignItems: 'stretch',
  justifyContent: 'flex-start',
};

export default Row;

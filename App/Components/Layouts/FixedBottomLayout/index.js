import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const TopLayout = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor]}
`;
//------------------------------------------------------------------------------
export const BottomLayout = styled.View`
  display: flex;
  justify-content: center;
  height: 88px;
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor]}
  border-top-width: 0.5px;
  border-color: ${({ theme, borderColor }) => theme.colors[borderColor]}
  padding-horizontal: 16px;
`;
//------------------------------------------------------------------------------
// COMPONENTS:
//------------------------------------------------------------------------------
TopLayout.propTypes = {
  bgColor: PropTypes.oneOf(Object.keys(Colors)),
};

TopLayout.defaultProps = {
  bgColor: 'white',
};

BottomLayout.propTypes = {
  bgColor: PropTypes.oneOf(Object.keys(Colors)),
  borderColor: PropTypes.oneOf(Object.keys(Colors)),
};

BottomLayout.defaultProps = {
  bgColor: 'white',
  borderColor: 'silver',
};

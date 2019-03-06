import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const TopLayout = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.transparent}
`;
//------------------------------------------------------------------------------
export const BottomLayout = styled.View`
  display: flex;
  justify-content: center;
  height: 88px;
  background-color: ${Colors.transparent}
  border-top-width: 0.5px;
  border-color: ${Colors.silver}
  padding-horizontal: 16px;
`;

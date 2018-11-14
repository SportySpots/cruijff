import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const TopLayout = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.white}
`;
//------------------------------------------------------------------------------
export const BottomLayout = styled.View`
  display: flex;
  justify-content: center;
  height: 88px;
  background-color: ${Colors.white}
  border-top-width: 0.5px;
  border-color: ${Colors.lightGray}
  padding-horizontal: 16px;
`;

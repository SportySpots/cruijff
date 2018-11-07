import styled from 'styled-components';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const TopLayout = styled.View`
  display: flex;
  justify-content: center;
  height: 46px;
  background-color: ${Colors.white}
  border-bottom-width: 0.5px;
  border-color: ${Colors.lightGray}
  padding-horizontal: 16px;
`;
//------------------------------------------------------------------------------
export const BottomLayout = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.concrete};
`;

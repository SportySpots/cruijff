import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const TopLayout = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white}
`;
//------------------------------------------------------------------------------
export const BottomLayout = styled.View`
  display: flex;
  justify-content: center;
  height: 88px;
  background-color: ${({ theme }) => theme.colors.white}
  border-top-width: 0.5px;
  border-color: ${({ theme }) => theme.colors.silver}
  padding-horizontal: 16px;
`;

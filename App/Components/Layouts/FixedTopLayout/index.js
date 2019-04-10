import styled from 'styled-components/native';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const TopLayout = styled.View`
  display: flex;
  justify-content: center;
  height: 46px;
  background-color: ${({ theme }) => theme.colors.white}
  border-bottom-width: 0.5px;
  border-color: ${({ theme }) => theme.colors.silver}
  padding-horizontal: 16px;
`;
//------------------------------------------------------------------------------
export const BottomLayout = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.concrete};
`;

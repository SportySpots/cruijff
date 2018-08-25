import styled from 'styled-components';
import Text from '../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
export const HorizontalView = styled.View`
  flex-direction: row;
`;
//------------------------------------------------------------------------------
export const ChevronContainer = styled(HorizontalView)`
  justify-content: center;
  align-items: center;
`;
//------------------------------------------------------------------------------
export const SwiperContainer = styled.View`
  height: 150px;
  width: 100%;
`;
//------------------------------------------------------------------------------
export const Block = styled.View`
  padding: 16px;
`;
//------------------------------------------------------------------------------
export const BlockHeader = styled(Block)`
  flex-direction: row;
`;
//------------------------------------------------------------------------------
export const HeaderLeft = styled.View`
  flex: 4;
`;
//------------------------------------------------------------------------------
export const HeaderRight = styled.View`
  flex: 3;
`;
//------------------------------------------------------------------------------
export const HeaderLeftDetails = styled(HorizontalView)`
  justify-content: space-between;
  margin-top: 16px;
`;
//------------------------------------------------------------------------------
export const Time = styled(HorizontalView)`
  align-items: center;
`;
//------------------------------------------------------------------------------
export const BlockLabel = styled(Text.M)`
  margin-bottom: 8px;
`;
//------------------------------------------------------------------------------

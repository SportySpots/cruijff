import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../../../Components/Common/Text';

//------------------------------------------------------------------------------
/* export const FilterLabel = styled(Text.M)`

`; */
//------------------------------------------------------------------------------
export const FilterDescription = styled(Text.SM)`
  color: ${Colors.gray};
`;
//------------------------------------------------------------------------------
export const Row = styled.View`
  flex-direction: row;
  margin-vertical: 8px;
`;
//------------------------------------------------------------------------------
/* export const RowVertical = Row.extend`
  flex-direction: column;
  flex: 1;
`; */
//------------------------------------------------------------------------------

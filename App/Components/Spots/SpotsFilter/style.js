import styled from 'styled-components';
import Text from '../../../Components/Text';
import Colors from '../../../Themes/Colors';

export const FilterLabel = styled(Text.M)`

`;

export const FilterDescription = styled(Text.SM)`
  color: ${Colors.gray};
`;

export const Row = styled.View`
  flex-direction: row;
  margin-vertical: 8px;
`;

export const RowVertical = Row.extend`
  flex-direction: column;
  flex: 1;
`;

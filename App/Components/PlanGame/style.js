import styled from 'styled-components';
import Text from '../../Components/Text';
import Colors from '../../Themes/Colors';

export const Title = styled(Text.L)`
  color: ${Colors.white};
  margin-bottom: 32;
`;

export const Label = styled(Text.M)`
  color: ${Colors.white};
  font-size: 24px;
`;

export const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 16px;
  /* flex: 1;
  flex-wrap: wrap; */
`;
